/* @flow */
import React from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'native-base';

import type { Navigation, Poster } from '../types';
import PosterCard from '../PosterCard';
import Empty from './Empty';
import Fetching from './Fetching';

type Props = {
  isFetchingPosterData: boolean,
  navigation: Navigation,
  posters: Array<Poster>,
}

const PosterCardList = (props: Props) =>
  <View>
    {
      props.isFetchingPosterData ?
        <Fetching /> : <Text />
    }
    <FlatList
      data={props.posters}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <PosterCard {...item} navigation={props.navigation}/>}
      ListEmptyComponent={Empty}
    />
  </View>;

export default PosterCardList;
