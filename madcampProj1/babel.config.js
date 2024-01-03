module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'babel-plugin-inline-import',
    [
      'module-resolver',
      {
        alias: {
          '@src': './src',
        },
      },
    ],
    [
      'react-native-reanimated/plugin',
      // {
      //   globals: ['__scanOCR'],
      // },
    ],
    ['react-native-worklets-core/plugin'],
  ],
};
