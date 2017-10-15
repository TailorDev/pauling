import React from 'react';
import { shallow } from 'enzyme';
import { Image } from 'react-native';
import Pdf from 'react-native-pdf';

import FileViewer from './index.android';

describe(__filename, () => {
  it('renders correctly', () => {
    const path = '/path/to/file/to/view';
    const wrapper = shallow(<FileViewer path={path} />);

    expect(wrapper.find(Pdf)).toHaveLength(1);
    expect(wrapper.find(Pdf)).toHaveProp('source', {
      uri: path,
    });
  });

  it('renders an Image when fileType is `png`', () => {
    const path = '/path/to/file/to/view';
    const fileType = 'png';
    const wrapper = shallow(<FileViewer path={path} fileType={fileType} />);

    expect(wrapper.find(Image)).toHaveLength(1);
    expect(wrapper.find(Image)).toHaveProp('source', {
      uri: `file://${path}`,
    });
  });

  it('renders an Image when fileType is `jpg`', () => {
    const path = '/path/to/file/to/view';
    const fileType = 'jpg';
    const wrapper = shallow(<FileViewer path={path} fileType={fileType} />);

    expect(wrapper.find(Image)).toHaveLength(1);
    expect(wrapper.find(Image)).toHaveProp('source', {
      uri: `file://${path}`,
    });
  });
});
