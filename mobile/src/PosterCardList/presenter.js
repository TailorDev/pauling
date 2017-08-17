/* @flow */
import React from 'react';
import { FlatList } from 'react-native';

import type { Poster } from '../types';
import PosterCard from '../PosterCard';


type Props = {
  posters: Array<Poster>,
}

const PosterCardList = ({ posters }: Props) =>
  <FlatList
    data={posters}
    renderItem={({item}) => <PosterCard {...item} />}
  />;

export default PosterCardList;
