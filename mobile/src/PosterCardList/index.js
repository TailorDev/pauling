/* @flow */
import { connect } from 'react-redux';

import PosterCardList from './presenter';
import type { State } from 'types';

const mapStateToProps = (state: State) => {
  const { posters, isFetchingPosterData } = state.posters;

  return {
    isFetchingPosterData,
    posters,
  };
};

export default connect(mapStateToProps)(PosterCardList);
