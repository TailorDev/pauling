import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Moment from 'moment';

import PosterCard from '../PosterCard';

const posters = [
  {
    key: 'uuid-01',
    title: 'Imperfect centered sites - a new mode of miRNA binding',
    thumbnailUrl: 'https://s3-eu-west-1.amazonaws.com/pfigshare-u-previews/1710259/thumb.png',
    authors: 'Nicole Cloonan',
    savedAt: Moment()
  },
  {
    key: 'uuid-02',
    title: 'The Value Proposition of Libraries in Research Information Management',
    thumbnailUrl: 'https://s3-eu-west-1.amazonaws.com/pfigshare-u-previews/9011278/thumb.png',
    authors: 'Rebecca Bryant, Holly Mercer',
    savedAt: Moment()
  },
];

const PosterCardList = () =>
  <FlatList
    data={posters}
    renderItem={({item}) => <PosterCard {...item} />}
  />;

export default PosterCardList;
