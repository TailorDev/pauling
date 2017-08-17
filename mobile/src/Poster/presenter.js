/* @flow */
import React from 'react';

import { Image, View } from 'react-native';
import { Text } from 'native-base';
import styles from './styles';
import { dateTimeFormat } from '../settings';
import type { Navigation, Poster as PosterType } from '../types';


type Props = {
  navigation: Navigation,
  ...PosterType,
}

const Poster = (props: Props) =>
  <View style={styles.PosterCard}>
    <Image
      source={{ uri: props.navigation.state.params.thumbnailUrl }}
      style={styles.PosterThumbnail}
    />
    <View style={styles.PosterInfos}>
      <Text style={styles.PosterTitle}>
        {props.navigation.state.params.title}
      </Text>
      <Text style={styles.PosterAuthors}>
        {props.navigation.state.params.authors}
      </Text>
      <Text style={styles.PosterSavedAt}>
        Saved: {props.navigation.state.params.savedAt.format(dateTimeFormat)}
      </Text>
    </View>
  </View>;

export default Poster;
