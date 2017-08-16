/* @flow */
import { connect } from 'react-redux';

import PosterCardList from './presenter';

const mapStateToProps = state => {
  const { app } = state;

  return {
    posters: app.posters,
  };
};

export default connect(mapStateToProps)(PosterCardList);
