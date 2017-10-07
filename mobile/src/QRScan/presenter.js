/* @flow */
import React, { Component } from 'react';
import { InteractionManager, View } from 'react-native';
import { Spinner, Text, Toast } from 'native-base';
import Camera from 'react-native-camera';
import Config from 'react-native-config';

import LoadingMessage from 'app/LoadingMessage';
import { colors } from 'app/settings';
import styles from './styles';
import type { BarCodeData, NavigationOptions } from 'app/types';

type Props = {|
  onQRCodeRead: Function,
|};

type State = {|
  mounted: boolean,
|};

const RE_UUID = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

class QRScan extends Component {
  props: Props;
  state: State;

  static navigationOptions = (): NavigationOptions => ({
    title: 'New poster',
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ mounted: true });
    });
  }

  isValidPaulingUrl(url: string): boolean {
    return new RegExp(`https?://${Config.API_SERVER_URL}/posters/${RE_UUID}`)
      .test(url);
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
        {this.state.mounted ?
          <Camera
            style={styles.Preview}
            aspect={Camera.constants.Aspect.fill}
            onBarCodeRead={this.onBarCodeRead}
            barCodeTypes={['qr']}
          >
            <Spinner color={colors.primaryColor} />

            <Text style={styles.Processing}>
              {'Scan a Pauling QR code to add it'.toUpperCase()}
            </Text>
          </Camera>
          :
          <LoadingMessage>
            We are kindly asking your camera to wake up. It is usually fast.
          </LoadingMessage>
        }
        </View>
    );
  }
}

export default QRScan;
