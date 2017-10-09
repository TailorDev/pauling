/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content } from 'native-base';

import ActionMenu from 'app/ActionMenu';
import PosterCardList from 'app/PosterCardList';
import styles from './styles';
import type { NavigationOptions } from 'app/types';
import type { State as NavigationState } from 'app/reducers/navigation';

type Props = {|
  navigation: NavigationState,
|};

class AppScreen extends Component {
  props: Props;

  static navigationOptions = (): NavigationOptions => ({
    header: null,
    title: null,
  });

  render() {
    return (
      <Container style={styles.AppScreen}>
        <Content padder>
          <PosterCardList navigation={this.props.navigation} />
        </Content>
        <View>
          <ActionMenu navigation={this.props.navigation} />
        </View>
      </Container>
    );
  }
}

export default AppScreen;
