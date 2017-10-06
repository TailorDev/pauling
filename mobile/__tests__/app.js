import React from 'react';
import { shallow } from 'enzyme';
import { Root } from "native-base";

import Pauling from '../src';


jest.mock('react-native-fetch-blob', () => ({
  DocumentDir: {},
}));

jest.mock('react-native-camera', () => ({
  constants: {
    Aspect: {},
  },
}));

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));

it('renders correctly', () => {
  const wrapper = shallow(<Pauling />);
  expect(wrapper.find(Root)).toHaveLength(1);
});
