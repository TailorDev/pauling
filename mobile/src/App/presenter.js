/* @flow */
import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import PosterCardList from '../PosterCardList';
import styles from './styles';
import type { Navigation, NavigationOptions } from '../types';


class App extends Component {

  props: {
    navigation: Navigation,
  };

  static navigationOptions: NavigationOptions = ({navigation, screenProps}) => ({
    title: 'Pauling collection',
  });

  render() {
    return (
      <Container style={styles.App}>
        <Content>
          <PosterCardList navigation={this.props.navigation} />
        </Content>
      </Container>
    );
  }
}

export default App;
