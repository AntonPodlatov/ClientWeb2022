module.exports = {
    root: true,

    env: {
        node: true
    },

    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],

    parserOptions: {
        parser: "@babel/eslint-parser"
    },

    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "vue/multi-word-component-names": 0,
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "no-multiple-empty-lines": ["error", {"max": 1, "maxEOF": 0, "maxBOF": 0}],
        "padded-blocks": ["error", "never"],
        "padding-line-between-statements": [
            "error",
            {"blankLine": "never", "prev": "function", "next": "*"}
        ]
    }
};
