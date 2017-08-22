/* @flow */
import React, { Component } from 'react';

import { ScrollView, View } from 'react-native';
import { Text } from 'native-base';
import Pdf from 'react-native-pdf';

import styles from './styles';
import { dateTimeFormat } from '../settings';
import type {
  Navigation,
  NavigationOptions,
  Poster as PosterType
} from '../types';

type Props = {
  ...PosterType,
  navigation: Navigation,
};

class Poster extends Component {

  props: Props;

  state : {
    loading: boolean,
  };

  pdf: any;

  static navigationOptions = ({navigation}): NavigationOptions => ({
    title: navigation.state.params.title,
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true
    };
    this.pdf = null;
  }

  render() {
    const { params } = this.props.navigation.state;
    const PdfUri = {uri: params.download_url, cache: true};

    return (
      <ScrollView style={styles.Poster}>
        {
          this.state.loading ?
            <View>
              <Text style={styles.Loading}>
                Loading your poster
              </Text>
            </View> : null
        }
        <Pdf
          ref={(pdf)=>{this.pdf = pdf;}}
          source={PdfUri}
          onLoadComplete={() => {this.setState({loading: false})}}
          style={styles.Pdf}
        />
        <View style={styles.Infos}>
          <Text style={styles.Title}>
            {params.title}
          </Text>
          <Text style={styles.Authors}>
            {params.authors}
          </Text>
          <Text style={styles.SavedAt}>
            Saved: {params.saved_at ? params.saved_at.format(dateTimeFormat): ''}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default Poster;
