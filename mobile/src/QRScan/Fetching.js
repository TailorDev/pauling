import React, { Component } from 'react';

import { View } from 'react-native';
import { Spinner, Text } from 'native-base';

import { colors } from '../settings';
import type { Poster } from '../types';
import styles from './styles';

type Props = {};


class Fetching extends Component {

  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = {
      hasFetchedData: false,
    };
  };

  render() {
    return (
      <View style={styles.Fetching}>
        <Text style={styles.FetchingMessage}>
          Collecting poster from Pauling database…
        </Text>
        <Spinner color={colors.textAltPrimaryColor} />
      </View>
    );
  }
}

export default Fetching;
