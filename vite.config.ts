import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import {resolve} from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '127.0.0.1',
        port: 8080,
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
