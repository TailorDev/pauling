/* @flow */
import { StyleSheet } from 'react-native';
import { colors } from '../settings';


export default StyleSheet.create({
  Poster: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    backgroundColor: colors.cardBackgroundColor,
  },
  Thumbnail: {
    height: 400,
    width: '100%',
    flex: 1,
  },
  Infos: {
    flex: 1,
  },
  Title: {
    padding: 10,
    fontSize: 15,
  },
  Authors: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
    color: colors.textSecondaryColor,
  },
  SavedAt: {
    paddingTop: 15,
    paddingRight: 10,
    paddingLeft: 10,
    color: colors.textSecondaryColor,
    fontSize: 9,
  }
});
