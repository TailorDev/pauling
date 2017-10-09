/* @flow */
import React, { Component } from 'react';
import { InteractionManager, View } from 'react-native';
import { Spinner, Text, Toast } from 'native-base';
import Camera from 'react-native-camera';
import Config from 'react-native-config';

import { colors } from 'app/settings';
import styles from './styles';
import type { BarCodeData, NavigationOptions } from 'app/types';

type Props = {|
  onQRCodeRead: Function,
  runAfterInteractions: Function,
|};

type State = {|
  mounted: boolean,
|};

const RE_UUID = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

class QRScanScreen extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    runAfterInteractions: InteractionManager.runAfterInteractions,
  };

  static navigationOptions = (): NavigationOptions => ({
    title: 'New poster',
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      mounted: false,
    };
  }

  componentWillMount() {
    this.props.runAfterInteractions(() => {
      this.setState({ mounted: true });
    });
  }

  isValidPaulingUrl(url: string): boolean {
    return new RegExp(
      `https?://${Config.API_SERVER_URL}/posters/${RE_UUID}`
    ).test(url);
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

  renderProcessing() {
    const text = 'Scan a Pauling QR code to add it'.toUpperCase();

    return (
      <Text style={styles.Processing}>
        {text}
      </Text>
    );
  }

  render() {
    if (this.state.mounted) {
      return (
        <View style={styles.QRScanScreen}>
          <Camera
            style={styles.Preview}
            aspect={Camera.constants.Aspect.fill}
            onBarCodeRead={this.onBarCodeRead}
            barCodeTypes={['qr']}
          >
            <Spinner color={colors.primaryColor} />
            {this.renderProcessing()}
          </Camera>
        </View>
      );
    }

    return (
      <View style={styles.QRScanScreen}>
        <View style={[styles.Preview, styles.PreviewNotMounted]}>
          {this.renderProcessing()}
        </View>
      </View>
    );
  }
}

export default QRScanScreen;
