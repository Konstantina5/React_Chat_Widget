import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // For development mode, use the default configuration
  if (mode === 'development') {
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
        }),
        cssInjectedByJsPlugin(),
      ],
      define: {
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env': {
          ...process.env,
        },
      },
    };
  }
  
  // For production builds, focus on the web component
  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
      }),
      cssInjectedByJsPlugin(),
    ],
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env': {
        ...process.env,
      },
    },
    build: {
      lib: {
        // Use the web component as the main entry point
        entry: resolve(__dirname, 'src/lib/react-widget-wrapper.tsx'),
        name: 'ReactChatWidget',
        formats: ['es', 'umd'],
        fileName: (format) => `react-chat-widget.${format}.js`,
      },
      outDir: 'dist',
      rollupOptions: {
        // Bundle all dependencies in the web component
        external: [],
        output: {
          // Generate a clean bundle with all dependencies included
          inlineDynamicImports: true,
          manualChunks: undefined,
        },
      },
      // Optimize the build for production
      minify: 'terser',
      sourcemap: true,
      // Ensure CSS is properly injected
      cssCodeSplit: false,
    },
  };
});
