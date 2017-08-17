/* @flow */
import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import PosterCardList from '../PosterCardList';
import styles from './styles';


class App extends Component {
  render() {
    return (
      <Container style={styles.App}>
        <Content>
          <PosterCardList />
        </Content>
      </Container>
    );
  }
}

export default App;
