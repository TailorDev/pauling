/* @flow */
import React, { Component } from 'react';

import { Image, ScrollView, View } from 'react-native';
import { Text } from 'native-base';
import Pdf from 'react-native-pdf';

import styles from './styles';
import { dateTimeFormat } from '../settings';
import type {
  Navigation,
  NavigationOptions,
} from '../types';

type Props = {
  navigation: Navigation,
  ...PosterType,
}



class Poster extends Component {

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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.title !== this.props.title)
      return false;
    return true
  }

  render() {
    const { params } = this.props.navigation.state;
    const PdfUri = {uri: params.PDFUrl, cache: true};

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
            Saved: {params.savedAt ? params.savedAt.format(dateTimeFormat): ''}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default Poster;
