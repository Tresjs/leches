/* eslint-disable max-len */
/* eslint-disable vue/max-len */
/// <reference types="histoire" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import analyze from 'rollup-plugin-analyzer'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'pathe'
import UnoCSS from 'unocss/vite'
import { presetUno, presetIcons, presetWebFonts, transformerDirectives, presetMini } from 'unocss'
import { lightGreen, magenta, gray, bold } from 'kolorist'

import pkg from './package.json'

function noop() {}
// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${magenta('🍰')} ${bold('Tres/leches')} v${pkg.version}`)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
        pkg.version
      }\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
    UnoCSS({
      /* options */
      presets: [
        presetMini(),
        presetUno({
          prefix: 'tl-',
          variablePrefix: 'tl-',
        }),
        presetIcons({
          scale: 1.2,
          warn: true,
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
            // ...
          },
        }),

        presetWebFonts({
          fonts: {
            sans: 'Roboto Mono',
          },
        }),
      ],
      transformers: [transformerDirectives()],
      shortcuts: {
        'tl-cta-icon': 'tl-h-4 tl-w-4 tl-p-1.5 tl-flex tl-items-center tl-line-height-0 tl-rounded-full tl-bg-gray-100 tl-text-xs',
        'tl-bg-primary': 'tl-bg-white dark:tl-bg-[#1a1a1a]',
        'tl-bg-secondary': 'tl-bg-gray-100 dark:tl-bg-slate-400/50',
        'tl-border-primary': 'tl-border-black dark:tl-border-slate-400/50',
        'tl-text-primary': 'tl-text-gray-400 dark:tl-text-gray-300',
        'tl-text-secondary': 'tl-text-gray-500 dark:tl-text-gray-300',
        'tl-btn-primary': 'tl-bg-secondary tl-text-gray-700 hover:tl-bg-gray-200 dark:tl-text-gray-200 dark:hover:tl-text-gray-700 dark:hover:tl-bg-gray-300',
        'tl-btn-secondary': 'tl-bg-dark-700 tl-text-light-100 hover:tl-bg-dark-600 dark:tl-bg-slate-400/50 dark:tl-text-gray-200 dark:hover:tl-bg-gray-300 dark:hover:tl-text-gray-700',
      },
    }),
    /*  cssInjectedByJsPlugin(), */
  
  ],
  test: {
    environment: process.env.BROWSER_TEST ? 'node' : 'jsdom',
    globals: true,
    threads: false,
    alias: {
      '/@': resolve(__dirname, './src'),
    },
    isolate: !process.env.BROWSER_TEST,
    browser: {
      enabled: !!process.env.BROWSER_TEST,

      // @ts-expect-error ignore, we don't have the type here in vitest
      enableUI: true,
      name: 'chrome',
      headless: !!process.env.HEADLESS,
      provider: 'webdriverio',
    },
    reporters: process.env.BROWSER_TEST
      ? [
          'json',
          {
            onInit: noop,
            onPathsCollected: noop,
            onCollected: noop,
            onFinished: noop,
            onTaskUpdate: noop,
            onTestRemoved: noop,
            onWatcherStart: noop,
            onWatcherRerun: noop,
            onServerRestart: noop,
            onUserConsoleLog: noop,
          },
          'default',
        ]
      : undefined,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tresleches',
      fileName: 'tresleches',
    },
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    rollupOptions: {
      plugins: [
        analyze(),
        visualizer({
          gzipSize: true,
          brotliSize: true,
          open: false,
        }),
      ],
      external: ['vue', '@vueuse/core'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@vueuse/core': 'VueUseCore',
          vue: 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue', '@vueuse/core'],
  },
})
/* eslint-enable max-len */
/* eslint-enable vue/max-len */