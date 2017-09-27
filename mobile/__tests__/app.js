import 'react-native';
import React from 'react';
import Pauling from '../src';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


jest.mock('react-native-fetch-blob', () => {
  return {
    DocumentDir: () => {},
  }
});

jest.mock('react-native-camera', () => {
  return {
    Aspect: [],
  }
});

jest.mock('react-native-splash-screen', () => {
  return {
    hide: () => {},
  }
});

it('renders correctly', () => {
  const tree = renderer.create(
    <Pauling />
  );
});
