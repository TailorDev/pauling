import React from 'react';

import { View } from 'react-native';
import { Spinner, Text } from 'native-base';

import { colors } from '../settings';
import styles from './styles';

const Fetching = () =>
  <View style={styles.Fetching}>
    <Text style={styles.FetchingMessage}>
      Collecting poster from Pauling database…
    </Text>
    <Spinner color={colors.textAltPrimaryColor} />
  </View>;

export default Fetching;
