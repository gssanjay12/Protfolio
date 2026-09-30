import { Resend } from 'resend';
import type { IncomingMessage, ServerResponse } from 'node:http';

// Interface extending IncomingMessage for frameworks like Vercel or Express
interface CustomRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string | string[]>;
}

// Interface extending ServerResponse for frameworks like Vercel or Express
interface CustomResponse extends ServerResponse {
  status?: (statusCode: number) => CustomResponse;
  json?: (data: any) => void;
}

// In-memory rate limiting map: ip -> { count, resetAt }
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Periodic cleanup of expired rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref();

function getClientIp(req: CustomRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string') {
    return realIp.trim();
  }
  return req.socket?.remoteAddress || '127.0.0.1';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

// Helper to safely extract JSON body across Vercel, Express, or raw Node/Vite connect middleware
async function parseBody(req: CustomRequest): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }

  return new Promise((resolve) => {
    let data = '';
    let isTooLarge = false;

    req.on('data', (chunk) => {
      data += chunk;
      // Cap at 100KB to protect against memory exhaustion
      if (data.length > 100 * 1024) {
        isTooLarge = true;
        req.destroy();
        resolve(null);
      }
    });

    req.on('end', () => {
      if (isTooLarge || !data) {
        return resolve(data ? null : {});
      }
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve(null);
      }
    });

    req.on('error', () => {
      resolve(null);
    });
  });
}

function sendResponse(res: CustomResponse, statusCode: number, payload: any) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(statusCode);
    res.json(payload);
    return;
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  // Remove ASCII control characters except standard whitespace and newlines
  // eslint-disable-next-line no-control-regex
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: CustomRequest, res: CustomResponse) {
  // CORS & Method Check
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Allow', 'POST, OPTIONS');
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendResponse(res, 405, {
      success: false,
      error: 'Method Not Allowed. Use POST.',
    });
  }

  // 1. Rate Limiting / Spam Protection
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', rateLimit.retryAfterSeconds.toString());
    return sendResponse(res, 429, {
      success: false,
      error: `Too many requests. Please wait ${rateLimit.retryAfterSeconds} seconds before sending another message.`,
    });
  }

  // 2. Parse Payload
  const body = await parseBody(req);
  if (!body || typeof body !== 'object') {
    return sendResponse(res, 400, {
      success: false,
      error: 'Invalid JSON request payload.',
    });
  }

  // Honeypot spam trap (_gotcha / honeypot)
  if (body._gotcha || body.honeypot) {
    // Pretend success so bots do not retry, but do not send email
    return sendResponse(res, 200, {
      success: true,
      message: 'Message sent successfully.',
    });
  }

  // 3. Sanitize inputs
  const rawName = sanitizeString(body.name);
  const rawEmail = sanitizeString(body.email);
  const rawMessage = sanitizeString(body.message);

  // 4. Validate fields
  const validationErrors: Record<string, string> = {};

  // Validate Name (2 - 100 chars, no line breaks to avoid header injection)
  if (!rawName) {
    validationErrors.name = 'Name is required.';
  } else if (rawName.length < 2) {
    validationErrors.name = 'Name must be at least 2 characters.';
  } else if (rawName.length > 100) {
    validationErrors.name = 'Name cannot exceed 100 characters.';
  } else if (/[\r\n]/.test(rawName)) {
    validationErrors.name = 'Name cannot contain line breaks.';
  }

  // Validate Email (RFC 5322 compliant regex, max 254 chars, no line breaks)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!rawEmail) {
    validationErrors.email = 'Email address is required.';
  } else if (rawEmail.length > 254) {
    validationErrors.email = 'Email address is too long.';
  } else if (!emailRegex.test(rawEmail) || /[\r\n]/.test(rawEmail)) {
    validationErrors.email = 'Please provide a valid email address.';
  }

  // Validate Message (8 - 5000 chars)
  if (!rawMessage) {
    validationErrors.message = 'Message is required.';
  } else if (rawMessage.length < 8) {
    validationErrors.message = 'Message must be at least 8 characters long.';
  } else if (rawMessage.length > 5000) {
    validationErrors.message = 'Message cannot exceed 5000 characters.';
  }

  if (Object.keys(validationErrors).length > 0) {
    return sendResponse(res, 400, {
      success: false,
      error: 'Validation failed.',
      errors: validationErrors,
    });
  }

  // 5. Environment Variable Check
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error('[API/Contact Error]: RESEND_API_KEY environment variable is not defined.');
    return sendResponse(res, 500, {
      success: false,
      error: 'Server email service is not configured. Missing RESEND_API_KEY.',
    });
  }

  // 6. Recipient and Sender Configuration
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || 'gssanjay128@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || 'Portfolio Contact <onboarding@resend.dev>';

  // 7. Plain text content formatted as specified
  const textContent = `Name: ${rawName}\nEmail: ${rawEmail}\n\nMessage:\n${rawMessage}`;

  // Formatted HTML content with sanitized values
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #070709;
      color: #E4E4E7;
      margin: 0;
      padding: 32px 16px;
    }
    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      background: #0F0F14;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    .header {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .pill {
      display: inline-block;
      font-family: monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      background: #CCFF00;
      color: #000000;
      padding: 4px 10px;
      border-radius: 9999px;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #F4F4F6;
      margin: 0;
    }
    .field-group {
      margin-bottom: 20px;
    }
    .label {
      font-family: monospace;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #71717A;
      margin-bottom: 6px;
    }
    .value {
      font-size: 15px;
      color: #F4F4F6;
      font-weight: 500;
    }
    .message-container {
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 20px;
      margin-top: 6px;
      font-size: 14px;
      line-height: 1.6;
      color: #E4E4E7;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .footer {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 20px;
      margin-top: 28px;
      font-family: monospace;
      font-size: 11px;
      color: #71717A;
      text-align: center;
    }
    .reply-hint {
      color: #00E5FF;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="pill">Portfolio Contact Dispatch</div>
      <h1>New Direct Message</h1>
    </div>

    <div class="field-group">
      <div class="label">Name / Entity</div>
      <div class="value">${escapeHtml(rawName)}</div>
    </div>

    <div class="field-group">
      <div class="label">Email Address</div>
      <div class="value">
        <a href="mailto:${escapeHtml(rawEmail)}" class="reply-hint">${escapeHtml(rawEmail)}</a>
      </div>
    </div>

    <div class="field-group">
      <div class="label">Message</div>
      <div class="message-container">${escapeHtml(rawMessage)}</div>
    </div>

    <div class="footer">
      Dispatched via Portfolio Contact Section • Reply to this email directly to contact ${escapeHtml(rawName)}.
    </div>
  </div>
</body>
</html>`;

  // 8. Send through Resend
  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: rawEmail,
      subject: `[Portfolio] Message from ${rawName}`,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error('[API/Contact Error] Resend rejected dispatch:', error);
      return sendResponse(res, 500, {
        success: false,
        error: error.message || 'Failed to dispatch email via Resend.',
      });
    }

    return sendResponse(res, 200, {
      success: true,
      message: 'Message dispatched successfully to inbox.',
      id: data?.id,
    });
  } catch (err: any) {
    console.error('[API/Contact Error] Unexpected error while sending email:', err);
    return sendResponse(res, 500, {
      success: false,
      error: err?.message || 'An unexpected server error occurred.',
    });
  }
}
