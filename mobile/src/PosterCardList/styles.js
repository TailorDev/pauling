/* @flow */
import { StyleSheet } from 'react-native';

import { colors } from 'app/settings';

export default StyleSheet.create({
  Empty: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  Fetching: {},
  FetchingMessage: {
    color: colors.textSecondaryColor,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    textAlign: 'center',
  },
  MessageIcon: {
    paddingTop: 50,
    color: colors.textSecondaryColor,
    fontSize: 80,
  },
  WelcomeMessage: {
    paddingTop: 50,
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: 'center',
    fontSize: 22,
    color: colors.textPrimaryColor,
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
