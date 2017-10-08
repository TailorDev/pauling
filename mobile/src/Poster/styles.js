/* @flow */
import { Dimensions, StyleSheet } from 'react-native';

import { colors } from 'app/settings';

export default StyleSheet.create({
  Poster: {
    backgroundColor: colors.cardBackgroundColor,
  },
  Pdf: {
    flex: 1,
    // Remove offset due to the navigation bar and footer menu.
    height: Dimensions.get('window').height - 135,
  },
  FooterButton: {
    backgroundColor: colors.secondaryColor,
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
