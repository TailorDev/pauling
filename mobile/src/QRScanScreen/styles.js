/* @flow */
import StyleSheet from 'app/PaulingStyleSheet';
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
  Footer: {
    flex: 0,
    justifyContent: 'center',
    height: 50,
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
