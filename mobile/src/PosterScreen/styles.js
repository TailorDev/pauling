/* @flow */
import { Dimensions } from 'react-native';

import StyleSheet from 'app/PaulingStyleSheet';
import { colors } from 'app/settings';

export default StyleSheet.create({
  Header: {
    paddingTop: 0,
    android: {
      height: 56,
    },
    ios: {
      height: 44,
    },
  },
  PosterScreen: {
    backgroundColor: colors.cardBackgroundColor,
  },
  Poster: {
    flex: 1,
    marginTop: 0,
    android: {
      // Remove offset due to the navigation bar and footer menu.
      height: Dimensions.get('window').height - 135,
    },
    ios: {
      height: Dimensions.get('window').height - 88,
    },
  },
  Info: {
    padding: 10,
  },
  FooterButton: {
    borderRadius: null,
    android: {
      backgroundColor: colors.secondaryColor,
    },
  },
  Title: {
    textAlign: 'center',
  },
  Authors: {
    textAlign: 'center',
    paddingTop: 10,
  },
  Abstract: {
    paddingTop: 20,
  },
  SavedAt: {
    paddingTop: 15,
    color: colors.textSecondaryColor,
    fontSize: 11,
  },
});
