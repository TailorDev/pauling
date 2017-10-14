/* @flow */
import React from 'react';
import { WebView } from 'react-native';

type Props = {|
  fileType?: string,
  path: string,
|};

const FileViewer = (props: Props) => <WebView source={{ uri: props.path }} />;

export default FileViewer;
