import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'native-base';

import styles from './styles';

const Empty = () =>
  <View style={styles.Empty}>
    <Icon name="md-qr-scanner" style={styles.MessageIcon} />
    <Text style={styles.WelcomeMessage}>
      Hi! I am Pauling, nice to meet you.
    </Text>
    <Text style={styles.Message}>
      You can add a poster to your collection by scanning a Pauling QR code.
      Use the button below to open your camera and follow the instructions.
    </Text>
  </View>;

export default Empty;
