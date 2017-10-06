/* @flow */
// $FlowFixMe: react-navigation module is explicitly ignored (see .flowconfig)
import { NavigationActions } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Toast } from 'native-base';

import type { Dispatch, Poster, ThunkAction } from 'app/types';

export type State = {|
  isFetchingPosterData: boolean,
  posters: Array<Poster>,
|};

const initialState: State = {
  isFetchingPosterData: false,
  posters: [],
};

const ADD_POSTER: 'ADD_POSTER' = 'ADD_POSTER';
const FETCH_POSTER_DATA_STARTED: 'FETCH_POSTER_DATA_STARTED' =
  'FETCH_POSTER_DATA_STARTED';
const FETCH_POSTER_DATA_FAILED: 'FETCH_POSTER_DATA_FAILED' =
  'FETCH_POSTER_DATA_FAILED';

type AddPosterAction = {|
  type: typeof ADD_POSTER,
  poster: Poster,
|};

const addPoster = (poster: Poster): AddPosterAction => {
  return { type: ADD_POSTER, poster };
};

type StartFetchingPosterAction = {|
  type: typeof FETCH_POSTER_DATA_STARTED,
|};

const startFetchingPoster = (): StartFetchingPosterAction => ({
  type: FETCH_POSTER_DATA_STARTED,
});

export const fetchPosterData = (paulingPosterUrl: string): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch(startFetchingPoster());

    RNFetchBlob.fetch(
      'GET', paulingPosterUrl, {
        Accept: 'application/json',
      })
      .then(response => response.json())
      .then(jsonData => {
        const poster = {
          ...jsonData.poster,
          saved_at: (new Date()).toLocaleString(),
        };

        dispatch(addPoster(poster));
        Reactotron.log('New poster fetched and added!', { poster });

        dispatch(NavigationActions.navigate({
          routeName: 'Poster',
          params: poster,
        }));
      })
      .catch((errorMessage, statusCode) => {
        dispatch({ type: FETCH_POSTER_DATA_FAILED });
        const message = 'Cannot fetch poster data. Please try again later.';
        Toast.show({
          text: message,
          position: 'bottom',
          buttonText: 'Dismiss',
        });
        Reactotron.error(message);
        Reactotron.log({ errorMessage, statusCode });
      });
  };
};

export type Action =
  | AddPosterAction
  | StartFetchingPosterAction
  | {| type: typeof FETCH_POSTER_DATA_FAILED |};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ADD_POSTER:
      return {
        ...state,
        isFetchingPosterData: false,
        posters: state.posters.concat([action.poster]),
      };

    case FETCH_POSTER_DATA_STARTED:
      return {
        ...state,
        isFetchingPosterData: true,
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
