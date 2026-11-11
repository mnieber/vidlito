import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  resolve: {
    // Use the TypeScript source of the npm overlays in /npm (see their package.json exports)
    conditions: ['development'],
  },
  esbuild: {
    // The npm overlays in /npm are compiled with the tsconfig settings below.
    // Without useDefineForClassFields, an uninitialized field such as `@data item?: T`
    // is not emitted, and then MobX silently skips making it observable.
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
        useDefineForClassFields: true,
      },
    },
  },
  server: {
    port: 4000,
    // The browser only talks to its own origin, so that the session cookie works and
    // there is no CORS. Django's CSRF check compares the Origin with the Host header,
    // so this must not use changeOrigin.
    proxy: {
      '/api/': { target: 'http://vidlito_be:8000' },
      '/graphql/': { target: 'http://vidlito_be:8000' },
    },
  },
});
