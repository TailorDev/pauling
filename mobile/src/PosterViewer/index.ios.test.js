import React from 'react';
import { shallow } from 'enzyme';
import WKWebView from 'react-native-wkwebview-reborn';
import RNFetchBlob from 'react-native-fetch-blob';

import PosterViewer from './index.ios';

describe(__filename, () => {
  it('renders correctly', () => {
    const path = '/path/to/file/to/view';
    const wrapper = shallow(<PosterViewer path={path} />);

    expect(wrapper.find(WKWebView)).toHaveLength(1);
    expect(wrapper.find(WKWebView)).toHaveProp('source', {
      uri: path,
      file: path,
      allowingReadAccessToURL: RNFetchBlob.fs.dirs.DocumentDir,
    });
  });

  it('configures a URI source for HTTP paths', () => {
    const path = 'https://example.org/poster.pdf';
    const wrapper = shallow(<PosterViewer path={path} />);

    expect(wrapper.find(WKWebView)).toHaveLength(1);
    expect(wrapper.find(WKWebView)).toHaveProp('source', { uri: path });
  });
});
