import React from 'react';
import { shallow } from 'enzyme';
import Pdf from 'react-native-pdf';
import PhotoView from 'react-native-photo-view';

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

  it('renders an PhotoView when fileType is `png`', () => {
    const path = '/path/to/file/to/view';
    const fileType = 'png';
    const wrapper = shallow(<FileViewer path={path} fileType={fileType} />);

    expect(wrapper.find(PhotoView)).toHaveLength(1);
    expect(wrapper.find(PhotoView)).toHaveProp('source', {
      uri: `file://${path}`,
    });
  });

  it('renders an PhotoView when fileType is `jpg`', () => {
    const path = '/path/to/file/to/view';
    const fileType = 'jpg';
    const wrapper = shallow(<FileViewer path={path} fileType={fileType} />);

    expect(wrapper.find(PhotoView)).toHaveLength(1);
    expect(wrapper.find(PhotoView)).toHaveProp('source', {
      uri: `file://${path}`,
    });
  });
});
