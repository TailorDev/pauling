/* @flow */
// $FlowFixMe: react-navigation module is explicitly ignored (see .flowconfig)
import { NavigationActions } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Toast } from 'native-base';

import type { ThunkAction } from '../types';
import { addPoster } from '../Poster/reducer';


// State
type State = {
  isFetchingPosterData: boolean,
}

const initialState: State = {
  isFetchingPosterData: false,
};

// Actions
const FETCH_POSTER_DATA_STARTED = 'pauling/poster/FETCH_POSTER_DATA_STARTED';
const FETCH_POSTER_DATA_SUCCEEDED = 'pauling/poster/FETCH_POSTER_DATA_SUCCEEDED';
const FETCH_POSTER_DATA_FAILED = 'pauling/poster/FETCH_DATA_POSTER_FAILED';

// Action Creators
export function fetchPosterData(paulingPosterUrl: string): ThunkAction {
  return (dispatch: Function) => {
    dispatch({ type: FETCH_POSTER_DATA_STARTED });

    RNFetchBlob.fetch(
      'GET',
      paulingPosterUrl,
      {
        Accept: 'application/json',
      })
      .then((response) => {
        var now = new Date();
        const saved_at = now.toLocaleString();
        const data = response.json();
        const poster = Object.assign(
          data.poster,
          { saved_at }
        );

        dispatch({ type: FETCH_POSTER_DATA_SUCCEEDED });
        dispatch(addPoster(poster));

        Reactotron.log('New poster fetched & added!');

        // Show the poster
        dispatch(NavigationActions.navigate({
          routeName: 'Poster',
          params: poster
        }));
      })
      .catch((errorMessage, statusCode) => {
        dispatch({ type: FETCH_POSTER_DATA_FAILED });
        const message = 'Cannot fetch poster data. Please try again later.';
        Toast.show({
          text: message,
          position: 'bottom',
          buttonText: 'Dismiss'
        });
        Reactotron.error(message);
        Reactotron.log({errorMessage, statusCode});
      });
  };
}

// Reducer
export default function reducer(state: Object = initialState, action: Object = {}) {
  switch (action.type) {
    case FETCH_POSTER_DATA_STARTED:
      return {
        ...state,
        isFetchingPosterData: true,
      };
    case FETCH_POSTER_DATA_SUCCEEDED:
      return {
        ...state,
        isFetchingPosterData: false,
      };
    case FETCH_POSTER_DATA_FAILED:
      return {
        ...state,
        isFetchingPosterData: false,
      };
    default:
      return state;
  }
}
