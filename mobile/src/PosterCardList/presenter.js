/* @flow */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Moment from 'moment';

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
