import React from 'react';
import { shallow } from 'enzyme';
import { WebView } from 'react-native';

import PosterViewer from './index.ios';

describe(__filename, () => {
  // See: https://github.com/facebook/react-native/issues/12440
  jest.mock('WebView', () => 'WebView');

  it('renders correctly', () => {
    const path = '/path/to/file/to/view';
    const wrapper = shallow(<PosterViewer path={path} />);

    expect(wrapper.find(WebView)).toHaveLength(1);
    expect(wrapper.find(WebView)).toHaveProp('source', {
      uri: path,
    });
  });
});
