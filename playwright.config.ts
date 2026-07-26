import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:4200';

export default defineConfig({
  testDir: './projects/showcase/e2e',
  // Map rendering is comparatively slow, and a few demos animate before settling.
  timeout: 90_000,
  expect: { timeout: 30_000 },
  // The demos depend on third-party tile/sprite services, which occasionally rate-limit
  // or stall. Retry rather than let that flake the suite (matches the previous setup).
  retries: 2,
  // WebGL rendering is not reliably deterministic when several maps compete for
  // the GPU, so the image-comparison specs run one at a time.
  workers: 1,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    video: process.env.CI ? 'retain-on-failure' : 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        launchOptions: {
          // MapLibre needs a real WebGL2 context; SwiftShader provides one in headless CI.
          args: ['--enable-unsafe-swiftshader'],
        },
      },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'npm start',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
