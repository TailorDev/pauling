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
const FETCH_POSTER_DATA_SUCCEEDED: 'FETCH_POSTER_DATA_SUCCEEDED' =
  'FETCH_POSTER_DATA_SUCCEEDED';
const FETCH_POSTER_DATA_FAILED: 'FETCH_POSTER_DATA_FAILED' =
  'FETCH_POSTER_DATA_FAILED';

type AddPosterAction = {|
  type: typeof ADD_POSTER,
  poster: Poster,
|};

export const addPoster = (poster: Poster): AddPosterAction => {
  return { type: ADD_POSTER, poster };
};

export const fetchPosterData = (paulingPosterUrl: string): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch({ type: FETCH_POSTER_DATA_STARTED });

    RNFetchBlob.fetch('GET', paulingPosterUrl, {
      Accept: 'application/json',
    })
      .then(response => {
        var now = new Date();
        const saved_at = now.toLocaleString();
        const data = response.json();
        const poster = Object.assign(data.poster, { saved_at });

        dispatch({ type: FETCH_POSTER_DATA_SUCCEEDED });
        dispatch(addPoster(poster));

        Reactotron.log('New poster fetched & added!');

        // Show the poster
        dispatch(
          NavigationActions.navigate({
            routeName: 'Poster',
            params: poster,
          })
        );
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
  | {| type: typeof FETCH_POSTER_DATA_STARTED |}
  | {| type: typeof FETCH_POSTER_DATA_SUCCEEDED |}
  | {| type: typeof FETCH_POSTER_DATA_FAILED |};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ADD_POSTER:
      return {
        ...state,
        posters: state.posters.concat([action.poster]),
      };
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
