import React from 'react';
import { shallow } from 'enzyme';
import { Root } from 'native-base';

import Pauling from 'app';
import configureStore from 'app/store/configureStore';

describe(__filename, () => {
  it('renders correctly', () => {
    const store = configureStore();
    const wrapper = shallow(<Pauling store={store} />);
    expect(wrapper.find(Root)).toHaveLength(1);
  });
});
