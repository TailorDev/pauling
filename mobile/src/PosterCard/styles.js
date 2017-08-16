import { StyleSheet } from 'react-native';
import { colors } from '../settings';


export default StyleSheet.create({
  PosterCard: {
    marginTop: 10,
  },
  PosterThumbnail: {
    height: 200,
    width: '50%',
    flex: 1,
  },
  PosterInfos: {
    height: '100%',
    width: '50%',
    flex: 1,
  },
  PosterTitle: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  PosterAuthors: {
    paddingLeft: 10,
    color: colors.textSecondaryColor,
  },
  PosterSavedAt: {
    paddingLeft: 10,
    color: colors.textSecondaryColor,
    fontSize: 10,
  }
});
