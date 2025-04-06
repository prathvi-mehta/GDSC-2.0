# E-Waste Management Frontend

## MIME Type Issues on Render

If you're facing issues with JavaScript modules being served with incorrect MIME types (`binary/octet-stream`), follow the instructions below to resolve the problem.

## Deployment Instructions for Render

### Option 1: Web Service Deployment (Recommended for MIME type issues)

1. In the Render dashboard, create a new "Web Service"
2. Connect your repository
3. Set the following configuration:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
4. Add these environment variables:
   - `NODE_VERSION`: `20`
   - `NODE_ENV`: `production`
5. Deploy the service

The Express server will serve all JavaScript files with the correct MIME type (`application/javascript`).

### Option 2: Static Site with Headers (Alternative)

If you prefer to use Render's static site hosting:

1. In the Render dashboard, create a new "Static Site" service
2. Connect your repository
3. Set the following configuration:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add these headers in the Render dashboard:
   - Path: `/*`, Header: `X-Content-Type-Options`, Value: `nosniff`
   - Path: `/assets/*.js`, Header: `Content-Type`, Value: `application/javascript`
   - Path: `/assets/*.css`, Header: `Content-Type`, Value: `text/css`
5. Deploy the site

## Testing Locally

To test the site with the Express server locally:

```bash
# Build the project
npm run build

# Start the Express server
npm run serve
```

Visit `http://localhost:5000` to verify everything works properly.

## Troubleshooting MIME Type Issues

If you still encounter MIME type issues:

1. Check browser console for specific file paths causing issues
2. Verify the correct Content-Type headers in network tab
3. Try using the Web Service deployment instead of Static Site
4. Check if any external JavaScript is loaded with wrong MIME types

## Technical Details

The issue occurs because some servers don't set the proper MIME type for ES modules. Browsers strictly require JavaScript modules to be served with the `application/javascript` MIME type as per the HTML spec. 