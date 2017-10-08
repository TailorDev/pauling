import React from 'react';
import { Text } from 'native-base';
import { shallow } from 'enzyme';

import configureStore from 'app/store/configureStore';
import ConnectedQRScanScreen from 'app/QRScanScreen';
import QRScanScreen from 'app/QRScanScreen/presenter';
import { createFakeBarCodeData } from 'tests/helpers';

describe(__filename, () => {
  const render = ({ store = configureStore(), ...params } = {}) => {
    const allProps = {
      store,
      ...params,
    };

    return shallow(<ConnectedQRScanScreen {...allProps} />)
      .find(QRScanScreen)
      .shallow();
  };

  it('renders correctly', () => {
    const wrapper = render();
    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.state('mounted')).toEqual(false);
  });

  it('indicates that it has been mounted', () => {
    const wrapper = render({ runAfterInteractions: fn => fn() });
    expect(wrapper.state('mounted')).toEqual(true);
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
