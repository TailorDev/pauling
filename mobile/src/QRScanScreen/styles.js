/* @flow */
import { StyleSheet } from 'react-native';

import { colors } from 'app/settings';

export default StyleSheet.create({
  QRScanScreen: {
    flex: 1,
  },
  Preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  PreviewNotMounted: {
    backgroundColor: 'black',
  },
  Processing: {
    flex: 0,
    width: '100%',
    padding: 20,
    fontSize: 11,
    textAlign: 'center',
    color: colors.textAltPrimaryColor,
    backgroundColor: colors.secondaryColor,
  },
});