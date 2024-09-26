module.exports = {
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:tailwindcss/recommended', 'prettier'],
    plugins: ['prettier', 'unused-imports'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022,
    },
    rules: {
        'prettier/prettier': ['error', { usePrettierrc: true }],
        'vue/require-default-prop': 0,
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-parsing-error': 'warn',
        'tailwindcss/no-custom-classname': 'off',
    },
    parser: 'vue-eslint-parser',
}
