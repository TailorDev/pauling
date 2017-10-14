/* @flow */
import React from 'react';
import { Image } from 'react-native';
import Pdf from 'react-native-pdf';

type Props = {|
  fileType?: string,
  path: string,
|};

const FileViewer = (props: Props) => {
  switch (props.fileType) {
    case 'png':
    case 'jpg':
      return (
        <Image style={{ flex: 1 }} source={{ uri: `file://${props.path}` }} />
      );

    default:
      return <Pdf style={{ flex: 1 }} source={{ uri: props.path }} />;
  }
};

export default FileViewer;
