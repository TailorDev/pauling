/* @flow */
import React from 'react';
import WKWebView from 'react-native-wkwebview-reborn';
import RNFetchBlob from 'react-native-fetch-blob';

type Props = {|
  fileType?: string,
  path: string,
|};

const PosterViewer = (props: Props) => {
  let source = { uri: props.path };
  if (!props.path.startsWith('http')) {
    source = {
      ...source,
      file: props.path,
      allowingReadAccessToURL: RNFetchBlob.fs.dirs.DocumentDir,
    };
  }

  return <WKWebView source={source} />;
};

export default PosterViewer;
