import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';
import legacy from '@vitejs/plugin-legacy';
import styleImport from 'vite-plugin-style-import';
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8080,
    },
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: name => {
                        // eslint-disable-next-line no-param-reassign
                        name = name.slice(3);
                        return `element-plus/packages/theme-chalk/src/${name}.scss`;
                    },
                    resolveComponent: name => `element-plus/lib/${name}`,
                },
            ],
        }),
        legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
        commonjsOptions: {
            ignoreDynamicRequires: false, // Default: false
            transformMixedEsModules: true,
            sourceMap: false,
        },
    },
});
