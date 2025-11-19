const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      // Matikan hapus import otomatis
      'no-unused-vars': 'warn',
      'no-unused-imports/no-unused-imports': 'off',
    }
  },
]);
