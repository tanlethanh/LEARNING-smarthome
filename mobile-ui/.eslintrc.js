module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:react/recommended',
        'standard'
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react',
        'sort-imports-es6-autofix'
    ],
    rules: {
        indent: ['error', 4],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'no-unused-vars': 'off',
        eqeqeq: 'off',
        // 'sort-imports': 'warn',
        'sort-imports-es6-autofix/sort-imports-es6': [2, {
            ignoreCase: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
        }],
        'no-case-declarations': 'off',
        'react/display-name': 'off',
        'no-undef': 'off',
        'array-callback-return': 'off',
        'multiline-ternary': ['error', 'always-multiline']
    }
}
