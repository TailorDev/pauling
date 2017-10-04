import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import QRScan from './presenter';


jest.mock('react-native-camera', () => {
  const React = require('react');

  class Camera extends React.Component {
    static constants = {
      Aspect: {},
      BarCodeType: {},
      Type: {},
      CaptureMode: {},
      CaptureTarget: {},
      CaptureQuality: {},
      Orientation: {},
      FlashMode: {},
      TorchMode: {},
    }

    render() {
      return null;
    }
  }

  return Camera;
});

it('renders correctly', () => {
  const tree = renderer.create(
    <QRScan onValidPaulingQRCodeRead={jest.fn()} />
  );

  const instance = tree.getInstance();
  expect(instance.isValidPaulingUrl('')).toEqual(false);
  expect(instance.isValidPaulingUrl(
    'https://pauling.lelab.tailordev.fr/posters/987b0371-ea96-46c1-a77c-04ff279c0b3a'
  )).toEqual(true);
  expect(instance.isValidPaulingUrl(
    'http://pauling.lelab.tailordev.fr/posters/987b0371-ea96-46c1-a77c-04ff279c0b3a'
  )).toEqual(true);
  expect(instance.isValidPaulingUrl(
    'http://pauling.lelab.tailordev.fr/posters/invalid-uuid'
  )).toEqual(false);
});
