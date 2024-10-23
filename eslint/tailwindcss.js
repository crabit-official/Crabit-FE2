module.exports = {
  root: true,
  extends: ['plugin:tailwindcss/recommended'],
  parser: '@typescript-eslint/parser',
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
  },
};
