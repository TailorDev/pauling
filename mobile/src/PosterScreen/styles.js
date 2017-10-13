/* @flow */
import { Platform, Dimensions } from 'react-native';

import StyleSheet from 'app/PaulingStyleSheet';
import { colors } from 'app/settings';

export default StyleSheet.create({
  Poster: {
    backgroundColor: colors.cardBackgroundColor,
  },
  Pdf: {
    flex: 1,
    // Remove offset due to the navigation bar and footer menu.
    height:
      Dimensions.get('window').height - (Platform.OS === 'ios' ? 120 : 135),
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
