/* @flow */
import React, { Component } from 'react';
import { Body, Button, Container, Content, Left, Header, Icon, Right, Text, Title } from 'native-base';

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
