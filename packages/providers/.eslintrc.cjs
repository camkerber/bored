const {resolve} = require("path");

module.exports = {
  extends: "@bored/eslint-config",
  parserOptions: {
    project: resolve(__dirname, "./tsconfig.json"),
  },
};
