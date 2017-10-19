/* @flow */
import React from 'react';
import WKWebView from 'react-native-wkwebview-reborn';
import RNFetchBlob from 'react-native-fetch-blob';

type Props = {|
  fileType?: string,
  path: string,
|};

const PosterViewer = (props: Props) => {
  return (
    <WKWebView
      source={{
        uri: props.path,
        file: props.path,
        allowingReadAccessToURL: RNFetchBlob.fs.dirs.DocumentDir,
      }}
    />
  );
};

export default PosterViewer;
