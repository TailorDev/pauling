import { createStore, applyMiddleware } from 'redux';

import rootReducer from './rootReducer';


const middlewares = [];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
