/* @flow */
import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import ActionMenu from 'app/ActionMenu';
import PosterCardList from 'app/PosterCardList';
import styles from './styles';
import type { Navigation, NavigationOptions } from 'app/types';

type Props = {|
  navigation: Navigation,
|};

type State = {|
  active: boolean,
|};

class App extends Component {
  props: Props;
  state: State;

  static navigationOptions = (): NavigationOptions => ({
    title: 'Pauling collection',
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <Container style={styles.App}>
        <Content>
          <PosterCardList navigation={this.props.navigation} />
        </Content>
        <ActionMenu navigation={this.props.navigation} />
      </Container>
    );
  }
}

export default App;
