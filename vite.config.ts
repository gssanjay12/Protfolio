import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import contactHandler from './api/contact.ts';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all environment variables from .env / .env.local (including non-VITE_ prefixed ones)
  const env = loadEnv(mode, process.cwd(), '');

  // Safely assign backend variables to process.env for local server handling
  for (const key of Object.keys(env)) {
    if (!process.env[key]) {
      process.env[key] = env[key];
    }
  }

  return {
    plugins: [
      react(),
      {
        name: 'contact-api-dev-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url?.split('?')[0];
            if (url === '/api/contact') {
              try {
                await contactHandler(req, res);
              } catch (err) {
                console.error('[Dev Server API Error]:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Internal server error.' }));
              }
            } else {
              next();
            }
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url?.split('?')[0];
            if (url === '/api/contact') {
              try {
                await contactHandler(req, res);
              } catch (err) {
                console.error('[Preview Server API Error]:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Internal server error.' }));
              }
            } else {
              next();
            }
          });
        },
      },
    ],
  };
});
