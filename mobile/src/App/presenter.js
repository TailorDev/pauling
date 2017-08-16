/* @flow */
import React, { Component } from 'react';
import { Body, Button, Container, Content, Left, Header, Icon, Right, Text, Title } from 'native-base';

import PosterCardList from '../PosterCardList';

export default class App extends Component {
  render() {
    return (
      <Container
        style={{
          backgroundColor: '#f5f5f5'
        }}
      >
        <Header>
          <Left />
          <Body>
            <Title>Posters</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <PosterCardList />
        </Content>
      </Container>
    );
  }
}
