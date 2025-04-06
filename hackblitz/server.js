import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Add debug logging middleware for Content-Type issues
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(...args) {
    console.log(`[DEBUG] Sending response for ${req.path} with Content-Type: ${res.get('Content-Type')}`);
    return originalSend.apply(res, args);
  };
  next();
});

// Force the Content-Type for JavaScript files
app.get('*.js', (req, res, next) => {
  res.set('Content-Type', 'application/javascript');
  next();
});

// Force the Content-Type for CSS files
app.get('*.css', (req, res, next) => {
  res.set('Content-Type', 'text/css');
  next();
});

// Serve static files with correct MIME types
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    console.log(`[DEBUG] Serving: ${filePath}`);
    
    // Set correct MIME types for JavaScript modules
    if (filePath.endsWith('.js')) {
      console.log('[DEBUG] Setting Content-Type: application/javascript');
      res.setHeader('Content-Type', 'application/javascript');
    }
    // Set correct MIME type for CSS
    else if (filePath.endsWith('.css')) {
      console.log('[DEBUG] Setting Content-Type: text/css');
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Catch-all route handler for SPA
app.get('*', (req, res) => {
  console.log(`[DEBUG] Catch-all route for: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).send('Server error');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'dist')}`);
  
  // Check if dist directory exists
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    console.log('Dist directory found!');
    
    // List all files in dist/assets directory to verify JavaScript files
    try {
      const assetsPath = path.join(__dirname, 'dist', 'assets');
      if (fs.existsSync(assetsPath)) {
        console.log('Assets in dist/assets directory:');
        fs.readdirSync(assetsPath).forEach(file => {
          console.log(`- ${file}`);
        });
      } else {
        console.log('No assets directory found in dist');
      }
    } catch (error) {
      console.error('Error listing assets:', error);
    }
  } else {
    console.error('ERROR: Dist directory not found!');
  }
}); 