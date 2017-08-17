import { createStore, applyMiddleware, compose } from 'redux';
import Reactotron from 'reactotron-react-native';

import rootReducer from './rootReducer';


const middlewares = [];
const createPaulingStore = __DEV__ ? Reactotron.createStore : createStore;

export default function configureStore() {
  const store = createPaulingStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  )
  return store;
}
