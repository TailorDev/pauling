/* @flow */
import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import ActionMenu from '../ActionMenu';
import PosterCardList from '../PosterCardList';
import type { Navigation, NavigationOptions } from '../types';
import styles from './styles';


type Props = {
  navigation: Navigation
}

type State = {
  active: boolean
}

class App extends Component {

  props: Props;
  state: State;

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
        <ActionMenu navigation={this.props.navigation}/>
      </Container>
    );
  }
}

export default App;
