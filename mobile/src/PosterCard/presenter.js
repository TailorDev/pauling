/* @flow */
import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Body, Card, CardItem, Text } from 'native-base';

import styles from './styles';
import type { Poster } from 'app/types';
import type { State as NavigationState } from 'app/reducers/navigation';

type Props = {|
  poster: Poster,
  navigation: NavigationState,
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
        <Card>
          <CardItem header>
            <Body>
              <Text numberOfLines={2}>
                {poster.title}
              </Text>
            </Body>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: poster.thumbnail_url }}
              style={{ height: 150, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem footer>
            <Body>
              <Text note numberOfLines={2}>
                {poster.authors}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default PosterCard;
