module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue'],
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        node: true,
        es6: true,
        browser: true,
        'vue/setup-compiler-macros': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/base',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        '.eslintrc-auto-import.json',
    ],
    globals: {
        defineOptions: 'readonly',
        dynamicImportComponents: 'readonly',
    },
    rules: {
        // typescript
        '@typescript-eslint/no-explicit-any': ['off'], // 允许使用any
        '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用非空断言
        '@typescript-eslint/ban-ts-comment': 'off', // 允许使用ts注释
        '@typescript-eslint/no-unused-vars': 'off', // 允许未使用的变量
        '@typescript-eslint/no-empty-function': 'off', // 允许空函数

        // vue
        'vue/no-parsing-error': ['error', {'x-invalid-end-tag': false}], // 允许vue渲染原生标签自闭合
        'vue/multi-word-component-names': 'off', // 关闭对vue组件名称的检测
        'vue/valid-v-for': 'off', // 关闭对v-for的检测
        'vue/require-v-for-key': 'off', // 关闭对v-for的检测
        'vue/no-mutating-props': 'off', // 关闭对props的检测
    },
};
