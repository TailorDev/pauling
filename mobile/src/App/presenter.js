/* @flow */
import React, { Component } from 'react';
import { Button, Container, Content, Icon, Fab } from 'native-base';

import PosterCardList from '../PosterCardList';
import type { Navigation, NavigationOptions } from '../types';
import { colors } from '../settings';
import styles from './styles';

type Props = {
  navigation: Navigation,
}

class App extends Component {

  props: Props;

  state: {
    active: boolean,
  }

  static navigationOptions = (): NavigationOptions => ({
    title: 'Pauling collection',
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      active: false
    };
  }

  render() {
    return (
      <Container style={styles.App}>
        <Content>
          <PosterCardList navigation={this.props.navigation} />
        </Content>
        <Fab
          active={this.state.active}
          direction="up"
          style={styles.Fab}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon
            name="ios-add"
            ios="ios-add"
            android="md-add"
          />
          <Button
            style={{backgroundColor: colors.secondaryColor}}
            onPress={() => this.props.navigation.navigate('QRScan')}
          >
            <Icon
              name="ios-qr-scanner"
              ios="ios-qr-scanner"
              android="md-qr-scanner"
            />
          </Button>
        </Fab>
      </Container>
    );
  }
}

export default App;
