# E-Waste Management Frontend

## Deployment Instructions for Render

### Option 1: Static Site Deployment (Recommended)

1. In the Render dashboard, create a new "Static Site" service
2. Connect your repository
3. Set the following configuration:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add the following headers in the Render dashboard under "Headers":
   - Path: `/*.js`, Header: `Content-Type`, Value: `application/javascript`
   - Path: `/*.css`, Header: `Content-Type`, Value: `text/css`
5. Deploy the site

### Option 2: Web Service Deployment

1. In the Render dashboard, create a new "Web Service"
2. Connect your repository
3. Set the following configuration:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
4. Deploy the service

## MIME Type Issues

If you encounter MIME type issues with JavaScript modules, ensure:

1. All JavaScript files are served with `Content-Type: application/javascript`
2. Check the Render dashboard to confirm header settings
3. In case of persistent issues, try using the Node.js server approach (Option 2) 