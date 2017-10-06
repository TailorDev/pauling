/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';

import rootReducer from 'app/reducers';

const middlewares = [thunk];
const createPaulingStore = __DEV__ ? Reactotron.createStore : createStore;

if (__DEV__) {
  const { logger } = require('redux-logger'); // eslint-disable-line

  middlewares.push(logger);
}

export default function configureStore() {
  const store = createPaulingStore(
    rootReducer,
    compose(applyMiddleware(...middlewares), autoRehydrate())
  );

  persistStore(store, { storage: AsyncStorage });

  return store;
}
