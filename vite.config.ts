import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '127.0.0.1',
        port: 8080,
        open: true,
    },
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
