/* @flow */
import { Dimensions, StyleSheet } from 'react-native';

import { colors } from 'app/settings';

export default StyleSheet.create({
  Poster: {
    flex: 1,
    backgroundColor: colors.cardBackgroundColor,
  },
  LoadingText: {
    flex: 1,
    padding: 40,
    textAlign: 'center',
    color: colors.textSecondaryColor,
  },
  Pdf: {
    flex: 1,
    // Remove offset due to the navigation bar and footer menu.
    height: Dimensions.get('window').height - 120,
  },
  Infos: {
    flex: 1,
  },
  FooterButton: {
    backgroundColor: colors.secondaryColor,
  },
  Title: {
    padding: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  Authors: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
  },
  Abstract: {
    padding: 10,
    fontSize: 13,
    textAlign: 'justify',
  },
  SavedAt: {
    paddingTop: 15,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 15,
    color: colors.textSecondaryColor,
    fontSize: 9,
  },
});
