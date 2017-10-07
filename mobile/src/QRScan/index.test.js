import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';

import configureStore from 'app/store/configureStore';
import ConnectedQRScan from 'app/QRScan';
import QRScan from 'app/QRScan/presenter';
import { createFakeBarCodeData } from 'tests/helpers';

describe(__filename, () => {
  const render = ({ store = configureStore(), ...params } = {}) => {
    const allProps = {
      store,
      ...params,
    };

    return shallow(<ConnectedQRScan {...allProps} />).find(QRScan).shallow();
  };

  it('renders correctly', () => {
    const wrapper = render();
    expect(wrapper.find(View)).toHaveLength(1);
  });

  it('calls on valid QR code scanned', () => {
    const url = [
      'https://pauling.lelab.tailordev.fr',
      '/posters/987b0371-ea96-46c1-a77c-04ff279c0b3a',
    ].join('');

    const store = configureStore();
    const fakeDispatch = sinon.stub(store, 'dispatch');

    const wrapper = render({ store });
    wrapper.instance().onBarCodeRead(createFakeBarCodeData(url));

    sinon.assert.callCount(fakeDispatch, 2);
  });
});
