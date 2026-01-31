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

app.use(express.static(DIST));

// SPA fallback: serve index.html for routes that don't match static files
app.get('*', (_, res) => {
  res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
