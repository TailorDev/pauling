/* @flow */
import React, { Component } from 'react';

import { Image, ScrollView, View } from 'react-native';
import { Text } from 'native-base';
import styles from './styles';
import { dateTimeFormat } from '../settings';
import type {
  Navigation,
  NavigationOptions,
  Poster as PosterType
} from '../types';


class Poster extends Component {
  props: {
    navigation: Navigation,
    ...PosterType,
  };

  static navigationOptions = ({navigation, screenProps}): NavigationOptions => ({
    title: navigation.state.params.title,
  });

  render() {
    const { params } = this.props.navigation.state;

    return (
      <ScrollView style={styles.Poster}>
        <Image
          source={{ uri: params.thumbnailUrl }}
          style={styles.Thumbnail}
        />
        <View style={styles.PosterInfos}>
          <Text style={styles.Title}>
            {params.title}
          </Text>
          <Text style={styles.Authors}>
            {params.authors}
          </Text>
          <Text style={styles.SavedAt}>
            Saved: {params.savedAt ? params.savedAt.format(dateTimeFormat): ''}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default Poster;
