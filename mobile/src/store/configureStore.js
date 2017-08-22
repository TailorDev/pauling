import { createStore, applyMiddleware, compose } from 'redux';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';


const middlewares = [thunk];
const createPaulingStore = __DEV__ ? Reactotron.createStore : createStore;

export default function configureStore() {
  const store = createPaulingStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  )
  return store;
}
