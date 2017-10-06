/* @flow */
import { StyleSheet } from 'react-native';
import { colors } from '../settings';

export default StyleSheet.create({
  PosterCard: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.cardBackgroundColor,
    shadowColor: colors.cardShadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  PosterThumbnail: {
    height: 200,
    width: '50%',
  },
  PosterInfos: {
    width: '50%',
    flex: 1,
  },
  PosterTitle: {
    padding: 10,
    fontSize: 15,
  },
  PosterAuthors: {
    paddingLeft: 10,
    fontSize: 12,
    color: colors.textSecondaryColor,
  },
  PosterSavedAt: {
    paddingTop: 15,
    paddingLeft: 10,
    color: colors.textSecondaryColor,
    fontSize: 9,
  },
});
