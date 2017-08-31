/* @flow */
import { connect } from 'react-redux';

import PosterCardList from './presenter';

const mapStateToProps = state => {
  const { poster } = state;

  return {
    posters: poster.posters,
  };
};

export default connect(mapStateToProps)(PosterCardList);
