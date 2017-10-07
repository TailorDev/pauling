import React from 'react';
import { shallow } from 'enzyme';
import { NavigationActions } from 'react-navigation';

import ConnectedAppNavigator from 'app/AppNavigator';
import AppNavigator from 'app/AppNavigator/presenter';
import configureStore from 'app/store/configureStore';

describe(__filename, () => {
  const render = ({ store = configureStore(), ...params } = {}) => {
    const allProps = {
      store,
      ...params,
    };

    return shallow(<ConnectedAppNavigator {...allProps} />)
      .find(AppNavigator)
      .shallow();
  };

  it('renders correctly', () => {
    const wrapper = render();
    expect(wrapper).toHaveLength(1);
  });

  it('does not go back when back button is pressed on first screen', () => {
    const store = configureStore();
    const wrapper = render({ store });

    expect(wrapper.instance().onBackPress()).toEqual(false);
  });

  it('goes back when back button is pressed', () => {
    const store = configureStore();
    store.dispatch(NavigationActions.navigate({ routeName: 'QRScan' }));

    const wrapper = render({ store });
    expect(wrapper.instance().onBackPress()).toEqual(true);
  });
});
