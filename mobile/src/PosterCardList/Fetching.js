import React from 'react';
import { View } from 'react-native';
import { Spinner, Text } from 'native-base';

import { colors } from 'app/settings';
import styles from './styles';

const Fetching = () =>
  <View style={styles.Fetching}>
    <Text style={styles.FetchingMessage}>
      Fetching the poster from Pauling, this should not take too long (in
      theory).
    </Text>
    <Spinner color={colors.textSecondaryColor} />
  </View>;

export default Fetching;
