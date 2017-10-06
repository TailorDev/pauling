/* @flow */
import { connect } from 'react-redux';

import PosterCardList from './presenter';
import type { State } from 'app/types';

const mapStateToProps = (state: State) => {
  const { errored, loading, posters } = state.posters;

  return {
    errored,
    loading,
    posters,
  };
};

export default connect(mapStateToProps)(PosterCardList);
