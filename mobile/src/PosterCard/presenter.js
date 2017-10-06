/* @flow */
import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';

import styles from './styles';
import type { Navigation, Poster } from 'app/types';

type Props = {|
  poster: Poster,
  navigation: Navigation,
|};

class PosterCard extends Component {
  props: Props;

  onPress = () => {
    this.props.navigation.navigate('Poster', this.props.poster);
  };

  render() {
    const { poster } = this.props;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.PosterCard}>
          <Image
            source={{ uri: poster.thumbnail_url }}
            style={styles.PosterThumbnail}
          />
          <View style={styles.PosterInfos}>
            <Text style={styles.PosterTitle} numberOfLines={6}>
              {poster.title}
            </Text>
            <Text style={styles.PosterAuthors} numberOfLines={2}>
              {poster.authors}
            </Text>
            <Text style={styles.PosterSavedAt}>
              Saved on {poster.saved_at}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default PosterCard;
