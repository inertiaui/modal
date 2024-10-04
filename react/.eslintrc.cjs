module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:tailwindcss/recommended',
        'prettier',
    ],
    plugins: ['react', 'react-hooks', 'prettier', 'unused-imports'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022,
    },
    rules: {
        'react/prop-types': 0,
        'react-hooks/exhaustive-deps': 'off',
        'prettier/prettier': ['error', { usePrettierrc: true }],
        'tailwindcss/no-custom-classname': 'off',
    },
    env: {
        browser: true,
        es2022: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
