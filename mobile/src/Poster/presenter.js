/* @flow */
import React from 'react';

import { Image, View } from 'react-native';
import { Text } from 'native-base';
import Moment from 'moment';
import styles from './styles';
import type { Poster as PosterType } from '../types';


const Poster = (props: PosterType) => {
  return (
    <View style={styles.PosterCard}>
      <Image
        source={{ uri: props.thumbnailUrl }}
        style={styles.PosterThumbnail}
      />
      <View style={styles.PosterInfos}>
        <Text style={styles.PosterTitle}>
          {props.title}
        </Text>
        <Text style={styles.PosterAuthors}>
          {props.authors}
        </Text>
        <Text style={styles.PosterSavedAt}>
          Saved: {props.savedAt.format('YYYY/MM/DD, HH:mm a')}
        </Text>
      </View>
    </View>
  );
}

export default Poster;
