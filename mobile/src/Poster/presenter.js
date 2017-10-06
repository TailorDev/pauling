/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'native-base';
import Pdf from 'react-native-pdf';

import styles from './styles';
import type { Navigation, NavigationOptions } from 'app/types';

type Props = {|
  navigation: Navigation,
|};

type State = {|
  loading: boolean,
|};

class Poster extends Component {
  props: Props;
  state: State;

  static navigationOptions = ({ navigation }): NavigationOptions => ({
    title: navigation.state.params.title,
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  onPdfLoaded = () => {
    this.setState({ loading: false });
  };

  render() {
    const { params: poster } = this.props.navigation.state;

    return (
      <View style={styles.Poster}>
        {this.state.loading ? (
          <View>
            <Text style={styles.Loading}>
              Loading your poster
            </Text>
          </View>
        ) : null}

        <Pdf
          onLoadComplete={this.onPdfLoaded}
          style={styles.Pdf}
          source={{
            uri: poster.download_url,
            cache: true,
          }}
        />

      <ScrollView style={styles.Infos}>
        <Text style={styles.Title}>
          {poster.title}
        </Text>
        <Text style={styles.Authors}>
          {poster.authors}
        </Text>
        <Text style={styles.Abstract}>
          {poster.abstract}
        </Text>
        <Text style={styles.SavedAt}>
          Saved on {poster.saved_at}
        </Text>
      </ScrollView>
    </View>
    );
  }
}

export default Poster;
