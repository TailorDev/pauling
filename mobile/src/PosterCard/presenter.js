/* @flow */
import React, { Component } from 'react';

import { Image, View } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import styles from './styles';


class PosterCard extends Component {
  render() {
    return (
      <Card style={styles.PosterCard}>
        <CardItem cardBody>
          <Image
            source={{ uri: 'https://s3-eu-west-1.amazonaws.com/pfigshare-u-previews/1710259/thumb.png' }}
            style={styles.PosterThumbnail}
          />
          <View style={styles.PosterInfos}>
            <Text style={styles.PosterTitle}>
              Imperfect centered sites - a new mode of miRNA binding
            </Text>
            <Text style={styles.PosterAuthors}>
              Nicole Cloonan
            </Text>
            <Text style={styles.PosterSavedAt}>
              Saved: 11h ago
            </Text>
          </View>
        </CardItem>
      </Card>
    );
  }
}

export default PosterCard;
