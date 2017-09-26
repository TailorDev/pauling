/* @flow */
import { connect } from 'react-redux';

import PosterCardList from './presenter';

const mapStateToProps = state => {
  const { posters, isFetchingPosterData } = state.poster;

  return {
    isFetchingPosterData,
    posters,
  };
};

export default connect(mapStateToProps)(PosterCardList);
