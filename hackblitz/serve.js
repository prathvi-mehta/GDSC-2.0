// Simple test server to check MIME types
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to log request info
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.path}`);
  
  const oldSend = res.send;
  res.send = function(...args) {
    console.log(`[RESPONSE] Content-Type: ${res.get('Content-Type')}`);
    return oldSend.apply(res, args);
  };
  
  next();
});

// Set Content-Type for JS files
app.get('*.js', (req, res, next) => {
  console.log('[MIDDLEWARE] Setting JS Content-Type');
  res.set('Content-Type', 'application/javascript');
  next();
});

// Set Content-Type for CSS files
app.get('*.css', (req, res, next) => {
  console.log('[MIDDLEWARE] Setting CSS Content-Type');
  res.set('Content-Type', 'text/css');
  next();
});

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    console.log(`[STATIC] Serving: ${filePath}`);
    
    if (filePath.endsWith('.js')) {
      console.log('[STATIC] Setting JS Content-Type');
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.css')) {
      console.log('[STATIC] Setting CSS Content-Type');
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Send SPA index.html for all other routes
app.get('*', (req, res) => {
  console.log('[SPA] Serving index.html');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  console.log(`Serving files from: ${path.join(__dirname, 'dist')}`);
  
  // Check for specific JS files
  const assetsDir = path.join(__dirname, 'dist', 'assets');
  if (fs.existsSync(assetsDir)) {
    console.log('\nJavaScript files in assets directory:');
    fs.readdirSync(assetsDir)
      .filter(file => file.endsWith('.js'))
      .forEach(file => {
        console.log(`- ${file}`);
      });
  }
}); 