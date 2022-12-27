// module.exports = {
//   root: true,
//   extends: '@react-native-community',
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
//   overrides: [
//     {
//       files: ['*.ts', '*.tsx'],
//       rules: {
//         '@typescript-eslint/no-shadow': ['error'],
//         'no-shadow': 'off',
//         'no-undef': 'off',
//       },
//     },
//   ],
// };
//Path: /.eslintrc.js

module.exports = {
  extends: [],
  "parser": "babel-eslint",

  rules: {
    'react/jsx-filename-extension': 'off',
    //You can override any rules you want
  },
};