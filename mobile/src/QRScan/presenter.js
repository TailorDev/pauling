/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner, Text, Toast } from 'native-base';
import Camera from 'react-native-camera';
import Config from 'react-native-config';

import { colors } from 'app/settings';
import styles from './styles';
import type { NavigationOptions } from 'app/types';

type Props = {|
  onQRCodeRead: Function,
|};

type BarCodeData = {|
  data: string,
  type: string,
|};

class QRScan extends Component {
  props: Props;

  static navigationOptions = (): NavigationOptions => ({
    title: 'New poster',
  });

  isValidPaulingUrl(url: string): boolean {
    const uuid = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

    return (new RegExp(
      `https?://${Config.API_SERVER_URL}/posters/${uuid}`
    )).test(url);
  }

  onBarCodeRead = (data: BarCodeData) => {
    const url = data.data;

    if (this.isValidPaulingUrl(url)) {
      this.props.onQRCodeRead(url);
    } else {
      Toast.show({
        text: 'Invalid QR code, please try again.',
        position: 'bottom',
        buttonText: 'Dismiss',
      });
    }
  };

  render() {
    return (
      <View style={styles.QRScan}>
        <Camera
          style={styles.Preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this.onBarCodeRead}
          barCodeTypes={['qr']}
        >
          <Spinner color={colors.primaryColor} />

          <Text style={styles.Processing}>
            Scan a Pauling QR code to add it.
          </Text>
        </Camera>
      </View>
    );
  }
}

export default QRScan;
