/* @flow */
import React from 'react';
import { FlatList } from 'react-native';
import { Toast } from 'native-base';

import LoadingMessage from 'app/LoadingMessage';
import PosterCard from 'app/PosterCard';
import Empty from './Empty';
import type { Poster } from 'app/types';
import type { State as NavigationState } from 'app/reducers/navigation';

import styles from './styles';

type Props = {|
  errored: boolean,
  loading: boolean,
  navigation: NavigationState,
  posters: Array<Poster>,
  toastComponent: typeof Toast,
|};

class PosterCardList extends React.Component {
  props: Props;

  static defaultProps = {
    toastComponent: Toast,
  };

  renderItem = ({ item }: { item: Poster }) => {
    return <PosterCard poster={item} navigation={this.props.navigation} />;
  };

  render() {
    const { errored, loading, posters, toastComponent } = this.props;

    if (errored) {
      toastComponent.show({
        text: 'Failed to load the poster. Please try again later.',
        position: 'bottom',
        buttonText: 'Dismiss',
      });
    }

    const isFetching = loading && !errored;

    if (isFetching) {
      return (
        <LoadingMessage>
          Fetching the poster from Pauling, this should not take too long (in
          theory).
        </LoadingMessage>
      );
    }

    return (
      <FlatList
        style={styles.List}
        data={posters}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        ListEmptyComponent={Empty}
      />
    );
  }
}

export default PosterCardList;
