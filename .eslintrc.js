module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  rules: {
    "prettier/prettier": "error",
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "always", children: "never" },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@mui/*/*/*", "!@mui/material/test-utils/*"],
      },
    ],
    "no-param-reassign": [2, { props: false }],
    "no-shadow": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "generic",
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeAlias",
        format: ["PascalCase"],
        prefix: ["T"],
      },
      {
        selector: "interface",
        format: ["PascalCase"],
        prefix: ["I"],
      },
    ],
    "no-unused-vars": "warn",
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
};
