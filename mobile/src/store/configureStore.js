import { createStore, applyMiddleware, compose } from 'redux';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';


const middlewares = [thunk];
const createPaulingStore = __DEV__ ? Reactotron.createStore : createStore;

if (__DEV__) {
  const { logger } = require('redux-logger'); // eslint-disable-line

  middlewares.push(logger);
}

export default function configureStore() {
  const store = createPaulingStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  )
  return store;
}
