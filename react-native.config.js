module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['./app/assets/fonts/'],
    dependencies: {
      '@invertase/react-native-apple-authentication': {
        platforms: {
          android: null,
        },
      },
      'react-native-rate': {
        platforms: {
          android: null,
        },
      },
    },
  };