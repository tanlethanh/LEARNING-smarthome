module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "standard",
        "prettier",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "sort-imports-es6-autofix", "prettier"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "no-unused-vars": "off",
        eqeqeq: "off",
        "sort-imports-es6-autofix/sort-imports-es6": [
            2,
            {
                ignoreCase: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
            },
        ],
        // "no-case-declarations": "off",
        "react/display-name": "off",
        // "no-undef": "off",
        "array-callback-return": "off",
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
                // useTabs: true,
                trailingComma: "all",
                // singleQuote: true,
                tabWidth: 4,
            },
        ],
        // 'max-len': ['error', { code: 80, ignoreStrings: true }]
    },
};
