/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Spinner, Text } from 'native-base';

import { colors } from 'app/settings';
import styles from './styles';

type Props = {|
  children?: string,
|};

const LoadingMessage = ({ children }: Props) =>
  <View style={styles.LoadingMessage}>
    <Text style={styles.Text}>
      {children}
    </Text>
    <Spinner color={colors.textSecondaryColor} />
  </View>;

export default LoadingMessage;
