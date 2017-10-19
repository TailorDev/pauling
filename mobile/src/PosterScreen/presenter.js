/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  H2,
  Text,
} from 'native-base';
// $FlowFixMe react-native-simple-markdown is explicitly ignored (see .flowconfig)
import Markdown from 'react-native-simple-markdown';

import PosterViewer from 'app/PosterViewer';
import styles from './styles';
import type { NavigationOptions } from 'app/types';
import type { State as NavigationState } from 'app/reducers/navigation';

type Props = {|
  navigation: NavigationState,
|};

type State = {|
  activeTab: typeof TAB_POSTER | typeof TAB_INFO,
|};

const TAB_POSTER: 'TAB_POSTER' = 'TAB_POSTER';
const TAB_INFO: 'TAB_INFO' = 'TAB_INFO';

class PosterScreen extends Component {
  props: Props;
  state: State;

  static navigationOptions = ({ navigation }): NavigationOptions => ({
    title: navigation.state.params.title,
    headerStyle: styles.Header,
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      activeTab: TAB_POSTER,
    };
  }

  render() {
    const { params: poster } = this.props.navigation.state;
    const { activeTab } = this.state;

    return (
      <Container style={styles.PosterScreen}>
        <Content>
          <View
            style={[
              styles.Poster,
              { display: activeTab === TAB_POSTER ? 'flex' : 'none' },
            ]}
            testID="Poster"
          >
            <PosterViewer
              fileType={poster.file_type}
              path={poster.cached_file}
            />
          </View>

          {activeTab === TAB_INFO &&
            <ScrollView style={styles.Info}>
              <H2 style={styles.Title}>
                {poster.title}
              </H2>
              <Text note style={styles.Authors}>
                {poster.authors}
              </Text>
              <Markdown style={styles.Abstract}>
                {poster.abstract}
              </Markdown>
              <Text style={styles.SavedAt}>
                Saved on {poster.saved_at}
              </Text>
            </ScrollView>}
        </Content>

        <Footer>
          <FooterTab>
            <Button
              active={activeTab === TAB_POSTER}
              style={styles.FooterButton}
              onPress={() => this.setState({ activeTab: TAB_POSTER })}
            >
              <Text>Poster</Text>
            </Button>
            <Button
              active={activeTab === TAB_INFO}
              style={styles.FooterButton}
              onPress={() => this.setState({ activeTab: TAB_INFO })}
            >
              <Text>More info</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default PosterScreen;
