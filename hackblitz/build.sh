#!/bin/bash

# Build the client application
echo "Building client application..."
npm install
npm run build

# Verify successful build
if [ -d "dist" ]; then
  echo "Build successful! dist directory exists."
  
  # List assets to verify build output
  echo "Files in dist directory:"
  find dist -type f | sort
  
  # Create a simple verification file for debugging
  echo "Creating verification file..."
  echo "Build completed on $(date)" > dist/build-info.txt
else
  echo "ERROR: Build failed! dist directory does not exist."
  exit 1
fi

# Ensure JavaScript files have correct MIME type
echo "Creating .htaccess file for correct MIME types..."
cat > dist/.htaccess << EOL
<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType text/css .css
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\.js$">
    Header set Content-Type "application/javascript"
  </FilesMatch>
</IfModule>
EOL

echo "Build process complete!" 