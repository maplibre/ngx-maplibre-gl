import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    globals: true,
    sequence: { setupFiles: "list" },
    environment: "jsdom",
    setupFiles: [path.resolve(__dirname, "src/vitest.setup.ts")],
    testTimeout: 3_000,
    reporters: ["verbose"],
    coverage: {
      provider: "v8", //  or 'istanbul, v8 is recommanded by vitest.'
      reporter: ["html", "lcovonly"],
      reportsDirectory: path.resolve(process.cwd(), "coverage"),
    },
  },
});
