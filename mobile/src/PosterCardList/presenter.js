/* @flow */
import React from 'react';
import { FlatList, View } from 'react-native';
import { Toast } from 'native-base';

import PosterCard from 'app/PosterCard';
import Empty from './Empty';
import Fetching from './Fetching';
import type { Navigation, Poster } from 'app/types';

type Props = {|
  errored: boolean,
  loading: boolean,
  navigation: Navigation,
  posters: Array<Poster>,
  toastComponent: typeof Toast,
|};

class PosterCardList extends React.Component {
  props: Props;

  static defaultProps = {
    toastComponent: Toast,
  };

  renderItem = (item: { item: Poster }) => {
    return (
      <PosterCard
        poster={item.item}
        navigation={this.props.navigation}
      />
    );
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

    return (
      <View>
        {isFetching
          ? <Fetching />
          : <FlatList
              data={posters}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              ListEmptyComponent={Empty}
            />}
      </View>
    );
  }
}

export default PosterCardList;
