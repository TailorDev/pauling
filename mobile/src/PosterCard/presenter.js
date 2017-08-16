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


class PosterCard extends Component {
  render() {
    return (
      <Card
        style={{
          marginTop: 10
        }}
      >
        <CardItem cardBody>
          <Image
            source={{ uri: 'https://s3-eu-west-1.amazonaws.com/pfigshare-u-previews/1710259/thumb.png' }}
            style={{
              height: 200,
              width: '50%',
              flex: 1
            }}
          />
          <View
            style={{
              height: '100%',
              width: '50%',
              flex: 1
            }}
          >
            <Text
              style={{
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10
              }}
            >
              Imperfect centered sites - a new mode of miRNA binding
            </Text>
            <Text
              style={{
                paddingLeft: 10
              }}
              note
            >
              Nicole Cloonan
            </Text>
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 10,
              }}
              note
            >
              Saved: 11h ago
            </Text>
          </View>
        </CardItem>
      </Card>
    );
  }
}

export default PosterCard;
