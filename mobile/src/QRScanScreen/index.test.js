import React from 'react';
import { Platform } from 'react-native';
import { Text } from 'native-base';
import { shallow } from 'enzyme';

import configureStore from 'app/store/configureStore';
import ConnectedQRScanScreen from 'app/QRScanScreen';
import QRScanScreen from 'app/QRScanScreen/presenter';
import { fetchPosterStarted } from 'app/reducers/posters';
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

  it('renders correctly on iOS', async () => {
    Platform.OS = 'ios';

    const wrapper = render();
    await wrapper.instance().componentDidMount();

    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.state('authorized')).toEqual(true);
    expect(wrapper.state('mounted')).toEqual(true);
  });

  it('renders correctly on Android', () => {
    Platform.OS = 'android';

    const wrapper = render();
    expect(wrapper.find(Text)).toHaveLength(1);
    // On Android, we set this state attribute to `true` after having run all
    // the interactions to speed up the UI.
    expect(wrapper.state('mounted')).toEqual(false);
    // On Android, this is always `true`.
    expect(wrapper.state('authorized')).toEqual(true);
    expect(wrapper.find('FakeCamera')).toHaveLength(0);
  });

  it('checks permissions on mount on iOS', async () => {
    Platform.OS = 'ios';

    const wrapper = render();
    await wrapper.instance().componentDidMount();

    expect(wrapper.state('authorized')).toEqual(true);
  });

  it('does not call runAfterInteractions on iOS', async () => {
    Platform.OS = 'ios';

    const runAfterInteractions = sinon.stub().callsArg(0);

    const wrapper = render({ runAfterInteractions });
    await wrapper.instance().componentDidMount();

    expect(wrapper.state('mounted')).toEqual(true);
    sinon.assert.notCalled(runAfterInteractions);
  });

  it('calls runAfterInteractions to update the state on Android', () => {
    Platform.OS = 'android';

    const runAfterInteractions = sinon.stub().callsArg(0);

    const wrapper = render({ runAfterInteractions });
    expect(wrapper.state('mounted')).toEqual(true);
    sinon.assert.callCount(runAfterInteractions, 1);
    expect(wrapper.find('FakeCamera')).toHaveLength(1);
  });

  it('calls on valid QR code scanned', () => {
    const url = [
      'https://pauling.lelab.tailordev.fr',
      '/posters/987b0371-ea96-46c1-a77c-04ff279c0b3a',
    ].join('');

    const store = configureStore();
    const fakeDispatch = sinon.stub(store, 'dispatch');

    const wrapper = render({ store });
    // This simulates a QR code scanned by the camera.
    wrapper.instance().onBarCodeRead(createFakeBarCodeData(url));

    sinon.assert.callCount(fakeDispatch, 2);
  });

  it('does not call onQRCodeRead if already loading', () => {
    const url = [
      'https://pauling.lelab.tailordev.fr',
      '/posters/987b0371-ea96-46c1-a77c-04ff279c0b3a',
    ].join('');

    const store = configureStore();
    store.dispatch(fetchPosterStarted());

    const fakeDispatch = sinon.stub(store, 'dispatch');

    const wrapper = render({ store });
    // This simulates a QR code scanned by the camera.
    wrapper.instance().onBarCodeRead(createFakeBarCodeData(url));

    sinon.assert.notCalled(fakeDispatch);
  });
});
