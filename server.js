/**
 * Production server for Cloud Run / Firebase App Hosting.
 * Serves the Vite build output and listens on PORT (default 8080).
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const DIST = path.join(__dirname, 'dist');

app.use(express.static(DIST, { index: false }));

// SPA fallback: serve index.html only for non-file requests (so /assets/*.js never returns HTML)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/assets/') || /\.[a-z0-9]+$/i.test(req.path)) {
    return next();
  }
  res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
