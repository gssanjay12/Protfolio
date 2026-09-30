import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import contactHandler from './api/contact.ts';

// ESM directory name resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Optional local environment file loading (for local testing without exposing secrets)
function loadLocalEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.resolve(__dirname, file);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const line of content.split('\n')) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#')) {
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx !== -1) {
              const key = trimmed.slice(0, eqIdx).trim();
              const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
              if (!process.env[key]) {
                process.env[key] = val;
              }
            }
          }
        }
      } catch {
        // Silently skip if unable to parse local file
      }
    }
  }
}
loadLocalEnv();

const app = express();
const PORT = parseInt(process.env.PORT || '10000', 10);
const HOST = '0.0.0.0';

// Limit JSON request body size to protect against memory exhaustion
app.use(express.json({ limit: '100kb' }));

// Render health check probe
app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Production Contact API route - reuses existing logic from api/contact.ts
app.all('/api/contact', async (req, res) => {
  try {
    await contactHandler(req as any, res as any);
  } catch (err: any) {
    console.error('[Production Server Error] /api/contact:', err);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: 'An internal server error occurred while processing your transmission.',
      });
    }
  }
});

// Serve compiled static assets from the dist directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA Fallback: send index.html for all non-API GET requests
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }
  // If an API route wasn't matched, return 404 JSON instead of HTML
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, error: 'Endpoint not found.' });
  }

  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(503).send('Application build in progress or dist/index.html not found.');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`[Production Server] Portfolio listening on http://${HOST}:${PORT}`);
});

export default app;
