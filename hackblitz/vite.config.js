import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Improve compatibility with web servers
    rollupOptions: {
      output: {
        // Use more compatible formats and naming
        format: 'es',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Ensure modules are bundled correctly
        manualChunks: undefined
      }
    },
    // Ensure proper MIME types are used
    assetsInlineLimit: 0,
    // Generate sourcemaps for debugging
    sourcemap: true,
    // Minify the output for production
    minify: 'terser',
  },
  optimizeDeps: {
    // Force inclusion of problematic dependencies
    include: ['react', 'react-dom', 'react-router-dom'],
  }
})
