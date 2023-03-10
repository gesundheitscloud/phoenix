import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  rollupPlugins: {
    after: [nodePolyfills()],
  },
  outputTargets: [
    {
      type: 'www',
      copy: [
        {
          src: '../node_modules/sql.js/dist/sql-wasm.wasm',
          dest: 'assets/sql-wasm.wasm',
        },
      ],
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/',
    },
  ],
};
