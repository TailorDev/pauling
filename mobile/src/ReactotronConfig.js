/* @flow */
import Reactotron, {
  asyncStorage,
  trackGlobalErrors,
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure({ name: 'Pauling' })
  .useReactNative()
  .use(asyncStorage())
  .use(reactotronRedux())
  .use(trackGlobalErrors())
  .connect();
