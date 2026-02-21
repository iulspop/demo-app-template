import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig as defineVitestConfig } from "vitest/config";

const rootConfig = defineConfig({
  plugins: [
    devtoolsJson(),
    tailwindcss(),
    !process.env.VITEST && !process.env.STORYBOOK && reactRouter(),
    tsconfigPaths(),
  ],
});

const testConfig = defineVitestConfig({
  test: {
    projects: [
      {
        ...rootConfig,
        test: {
          env: { TZ: "UTC" },
          include: ["app/**/*.test.ts"],
          name: "unit-tests",
        },
      },
      {
        ...rootConfig,
        test: {
          env: { TZ: "UTC" },
          include: ["app/**/*.spec.ts"],
          name: "integration-tests",
        },
      },
      {
        ...rootConfig,
        test: {
          env: { TZ: "UTC" },
          environment: "happy-dom",
          include: ["app/**/*.test.tsx"],
          name: "react-happy-dom-tests",
          setupFiles: ["app/test/setup-browser-test-environment.ts"],
        },
      },
    ],
  },
});

export default defineConfig({ ...rootConfig, ...testConfig });
