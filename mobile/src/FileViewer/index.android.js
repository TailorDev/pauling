/* @flow */
import React from 'react';
import Pdf from 'react-native-pdf';
import PhotoView from 'react-native-photo-view';

type Props = {|
  fileType?: string,
  path: string,
|};

const FileViewer = (props: Props) => {
  switch (props.fileType) {
    case 'png':
    case 'jpg':
      return (
        <PhotoView
          style={{ flex: 1 }}
          source={{ uri: `file://${props.path}` }}
        />
      );

    default:
      return <Pdf style={{ flex: 1 }} source={{ uri: props.path }} />;
  }
};

export default FileViewer;
