/* @flow */
import { StyleSheet } from 'react-native';
import { colors } from '../settings';


export default StyleSheet.create({
  QRScan: {
    flex: 1,
  },
  Preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  Processing: {
    flex: 0,
    width: '100%',
    padding: 10,
    color: colors.textAltPrimaryColor,
    backgroundColor: colors.secondaryColor,
  },
  Fetching: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryColor,
  },
  FetchingMessage: {
    textAlign: 'center',
    color: colors.textAltPrimaryColor,
  }
});
