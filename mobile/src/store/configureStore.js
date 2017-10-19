/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';

import rootReducer from 'app/reducers';

const middlewares = [thunk];

// istanbul ignore next
if (__DEV__) {
  const { logger } = require('redux-logger'); // eslint-disable-line

  middlewares.push(logger);
}

export default function configureStore(onComplete: Function) {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares), autoRehydrate())
  );

  persistStore(
    store,
    {
      blacklist: ['navigation'],
      storage: AsyncStorage,
    },
    onComplete
  );

  return store;
}
