import React from 'react';

import { View } from 'react-native';
import { Icon, Text } from 'native-base';

import styles from './styles';


const Empty = () => (
  <View style={styles.Empty}>
    <Icon
      name="md-qr-scanner"
      style={styles.MessageIcon}
    />
    <Text style={styles.Message}>
      Scan a Pauling QR code to add a first poster to your collection
    </Text>
  </View>
);

export default Empty;
