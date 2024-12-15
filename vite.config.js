import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: ['chrome90', 'firefox90', 'safari15', 'es2022'],
    },
});