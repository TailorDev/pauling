/* @flow */
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
  Footer: {
    flex: 0,
    height: 50,
    justifyContent: 'center',
    padding: 10,
    width: '100%',
    android: {
      backgroundColor: colors.secondaryColor,
    },
    ios: {
      backgroundColor: colors.secondaryColorIOS,
    },
  },
  FooterText: {
    fontSize: 11,
    textAlign: 'center',
    android: {
      color: colors.textAltPrimaryColor,
    },
    ios: {
      color: colors.textAltPrimaryColorIOS,
    },
  },
});
