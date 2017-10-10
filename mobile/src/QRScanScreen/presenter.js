/* @flow */
import React, { Component } from 'react';
import { InteractionManager, Platform, View } from 'react-native';
import { Spinner, Text, Toast } from 'native-base';
import Camera from 'react-native-camera';
import Config from 'react-native-config';
import { oneLine } from 'common-tags';

import { colors } from 'app/settings';
import styles from './styles';
import type { BarCodeData, NavigationOptions } from 'app/types';

type Props = {|
  loading: boolean,
  onQRCodeRead: Function,
  runAfterInteractions: Function,
|};

type State = {|
  authorized: boolean | null,
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
      authorized: Platform.OS === 'android' ? true : null,
      mounted: false,
    };
  }

  // $FlowFixMe: let this method be asynchronous.
  async componentDidMount() {
    if (Platform.OS === 'ios') {
      let authorized;
      try {
        authorized = await Camera.checkDeviceAuthorizationStatus();
      } catch (e) {
        authorized = false;
      }

      this.setState({ authorized });
    }

    if (Platform.OS === 'android') {
      // Android takes ages to start the camera and it blocks the rendering of
      // this screen. To prevent that, we delay the camera opening.
      this.props.runAfterInteractions(() => {
        this.setState({ mounted: true });
      });
    } else {
      this.setState({ mounted: true });
    }
  }

  isValidPaulingUrl(url: string): boolean {
    return new RegExp(
      `https?://${Config.API_SERVER_URL}/posters/${RE_UUID}`
    ).test(url);
  }

  onBarCodeRead = (data: BarCodeData) => {
    if (this.props.loading) {
      return;
    }

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

  renderFooter() {
    if (this.state.authorized === null) {
      return <Text />;
    }

    let text;
    if (this.state.authorized) {
      text = 'Scan a Pauling QR code to download it!';
    } else {
      text = oneLine`You must give Pauling access to the camera and
          microphone. Go to Settings > Pauling.`;
    }

    if (Platform.OS === 'android') {
      text = text.toUpperCase();
    }

    return (
      <View style={styles.Footer}>
        <Text style={styles.FooterText}>
          {text}
        </Text>
      </View>
    );
  }

  render() {
    if (this.state.mounted && this.state.authorized) {
      return (
        <View style={styles.QRScanScreen}>
          <Camera
            style={styles.Preview}
            aspect={Camera.constants.Aspect.fill}
            onBarCodeRead={this.onBarCodeRead}
            barCodeTypes={[Camera.constants.BarCodeType.qr]}
          >
            <Spinner color={colors.primaryColor} />
            {this.renderFooter()}
          </Camera>
        </View>
      );
    }

    return (
      <View style={styles.QRScanScreen}>
        <View style={[styles.Preview, styles.PreviewNotMounted]}>
          {this.renderFooter()}
        </View>
      </View>
    );
  }
}

export default QRScanScreen;
