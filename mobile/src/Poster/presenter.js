/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'native-base';
import Pdf from 'react-native-pdf';

import styles from './styles';
import type {
  Navigation,
  NavigationOptions,
  Poster as PosterType,
} from 'app/types';

type Props = {|
  ...PosterType,
  navigation: Navigation,
|};

type State = {|
  loading: boolean,
|};

class Poster extends Component {
  props: Props;
  state: State;
  pdf: any;

  static navigationOptions = ({ navigation }): NavigationOptions => ({
    title: navigation.state.params.title,
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
    };
    this.pdf = null;
  }

  onPDFLoaded = () => {
    this.setState({ loading: false });
  };

  render() {
    const { params } = this.props.navigation.state;
    const PdfUri = { uri: params.download_url, cache: true };

    return (
      <View style={styles.Poster}>
        {this.state.loading
          ? <View>
              <Text style={styles.Loading}>Loading your poster</Text>
            </View>
          : null}
        <Pdf
          ref={pdf => {
            this.pdf = pdf;
          }}
          source={PdfUri}
          onLoadComplete={this.onPDFLoaded}
          style={styles.Pdf}
        />
        <ScrollView style={styles.Infos}>
          <Text style={styles.Title}>
            {params.title}
          </Text>
          <Text style={styles.Authors}>
            {params.authors}
          </Text>
          <Text style={styles.Abstract}>
            {params.abstract}
          </Text>
          <Text style={styles.SavedAt}>
            Saved: {params.saved_at}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

export default Poster;
