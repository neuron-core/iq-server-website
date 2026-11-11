// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://iq-server.dev',
  // A parent's scoped styles reach a child component through its `class` prop.
  scopedStyleStrategy: 'class',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Breakpoint mixins are available in every <style lang="scss"> block.
          loadPaths: [fileURLToPath(new URL('./src/styles', import.meta.url))],
          additionalData: '@use "breakpoints" as *;\n',
        },
      },
    },
  },
});
