import React from 'react';
import { shallow } from 'enzyme';
import { Root } from 'native-base';

import Pauling from 'app';

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));

it('renders correctly', () => {
  const fakeStore = {};
  const wrapper = shallow(<Pauling store={fakeStore} />);
  expect(wrapper.find(Root)).toHaveLength(1);
});
