import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    env: {
      apiUrl: 'http://127.0.0.1:8080'
    },
    viewportHeight: 900,
    viewportWidth: 1440,
    video: false
  }
});
