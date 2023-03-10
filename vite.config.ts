import { fileURLToPath, URL } from "node:url";

import copy from "rollup-plugin-copy";

import { defineConfig } from 'vitest/config';
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      // reporter: ['text', 'json', 'html'],
      all: true,
      include: ["src/**/*.*"],
    },
  },
  plugins: [
    copy({
      targets: [
        {
          src: "node_modules/@maersk-global/icons/js/**/*",
          dest: "dist/assets/",
        },
      ],
      flatten: false,
      hook: "writeBundle",
    }),
    vue({
      template: {
        compilerOptions:
        {
          isCustomElement: (tag) => tag.includes('mc-'),
        },
      },
      
    })],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    
  },
});

