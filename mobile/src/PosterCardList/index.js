/* @flow */
import { connect } from 'react-redux';

import PosterCardList from './presenter';

const mapStateToProps = state => {
  const { posters } = state;

  return {
    posters: posters.posters,
  };
};

export default connect(mapStateToProps)(PosterCardList);
