/* @flow */
import React from 'react';
import { FlatList } from 'react-native';

import type { Navigation, Poster } from '../types';
import PosterCard from '../PosterCard';
import Empty from './Empty';

type Props = {
  navigation: Navigation,
  posters: Array<Poster>,
}

const PosterCardList = ({ navigation, posters }: Props) =>
  <FlatList
    data={posters}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => <PosterCard {...item} navigation={navigation}/>}
    ListEmptyComponent={Empty}
  />;

export default PosterCardList;
