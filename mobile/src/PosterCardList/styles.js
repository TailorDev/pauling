/* @flow */
import { StyleSheet } from 'react-native';
import { colors } from '../settings';

export default StyleSheet.create({
  Empty: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  MessageIcon: {
    paddingTop: 50,
    color: colors.textSecondaryColor,
    fontSize: 60,
  },
  Message: {
    paddingTop: 50,
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: 'center',
    fontSize: 20,
    color: colors.textSecondaryColor,
  },
});
