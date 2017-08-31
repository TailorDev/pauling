/* @flow */
import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../settings';


export default StyleSheet.create({
  Poster: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.cardBackgroundColor,
  },
  Loading: {
    padding: 40,
    textAlign: 'center',
    color: colors.textSecondaryColor,
  },
  Pdf: {
    flex: 3,
  },
  Infos: {
    flex: 1,
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
  }
});
