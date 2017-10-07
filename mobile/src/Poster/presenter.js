/* @flow */
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
} from 'native-base';
import Pdf from 'react-native-pdf';

import styles from './styles';
import type { NavigationOptions } from 'app/types';
import type { State as NavigationState } from 'app/reducers/navigation';

type Props = {|
  navigation: NavigationState,
|};

type State = {|
  activeTab: typeof TAB_PDF | typeof TAB_INFO,
|};

const TAB_PDF: 'TAB_PDF' = 'TAB_PDF';
const TAB_INFO: 'TAB_INFO' = 'TAB_INFO';

class Poster extends Component {
  props: Props;
  state: State;

  static navigationOptions = ({ navigation }): NavigationOptions => ({
    title: navigation.state.params.title,
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      activeTab: TAB_PDF,
    };
  }

  render() {
    const { params: poster } = this.props.navigation.state;
    const { activeTab } = this.state;

    return (
      <Container>
        <Content style={styles.Poster}>
          <Pdf
            style={[
              styles.Pdf,
              { display: activeTab === TAB_PDF ? 'flex' : 'none' },
            ]}
            source={{
              uri: poster.download_url,
              cache: true,
            }}
          />

          {activeTab === TAB_INFO &&
            <ScrollView style={styles.Infos}>
              <Text style={styles.Title}>
                {poster.title}
              </Text>
              <Text style={styles.Authors}>
                {poster.authors}
              </Text>
              <Text style={styles.Abstract}>
                {poster.abstract}
              </Text>
              <Text style={styles.SavedAt}>
                Saved on {poster.saved_at}
              </Text>
            </ScrollView>}
        </Content>

        <Footer>
          <FooterTab>
            <Button
              active={activeTab === TAB_PDF}
              style={styles.FooterButton}
              onPress={() => this.setState({ activeTab: TAB_PDF })}
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

export default Poster;
