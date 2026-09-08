import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig(() => {
  const isWallpaper = process.env.BUILD_TARGET === 'wallpaper';

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(isWallpaper ? [viteSingleFile()] : [])
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true
        }
      }
    },
    build: isWallpaper
      ? {
          outDir: 'D:/wallpapers/new',
          emptyOutDir: true,
          assetsInlineLimit: 100000000,
          chunkSizeWarningLimit: 10000
        }
      : {
          outDir: 'dist',
          chunkSizeWarningLimit: 1600,
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes('node_modules')) {
                  if (id.includes('three') || id.includes('@react-three')) {
                    return 'three-vendor';
                  }
                  if (id.includes('react') || id.includes('framer-motion')) {
                    return 'framework-vendor';
                  }
                }
              }
            }
          }
        }
  };
});


