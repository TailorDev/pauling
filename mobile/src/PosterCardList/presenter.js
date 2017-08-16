import React, { Component } from 'react';
import { FlatList } from 'react-native';

import PosterCard from '../PosterCard';

export default class PosterCardList extends Component {
  render() {
    return (
      <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <PosterCard />}
      />
    );
  }
}
