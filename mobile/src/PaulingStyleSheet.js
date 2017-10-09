/* @flow */
import { Platform, StyleSheet } from 'react-native';

// TODO: Flow complains about 'some string with unknown value' and links to
// `react-native/Libraries/StyleSheet/StyleSheet.js`.
// $FlowFixMe
export const create = (styles: Object): { [name: string]: number } => {
  if (!styles) {
    throw new Error('styles argument is required');
  }

  const platformStyles = {};
  Object.keys(styles).forEach(name => {
    let { ios, android, ...style } = { ...styles[name] };

    if (ios && Platform.OS === 'ios') {
      style = { ...style, ...ios };
    }

    if (android && Platform.OS === 'android') {
      style = { ...style, ...android };
    }

    platformStyles[name] = style;
  });

  return StyleSheet.create(platformStyles);
};

export default {
  create,
};
