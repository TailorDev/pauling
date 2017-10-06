/* @flow */
// $FlowFixMe: react-navigation module is explicitly ignored (see .flowconfig)
import { NavigationActions } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import RNFetchBlob from 'react-native-fetch-blob';

import type { Dispatch, Poster, ThunkAction } from 'app/types';

export type State = {|
  errored: boolean,
  loading: boolean,
  posters: Array<Poster>,
|};

const initialState: State = {
  errored: false,
  loading: false,
  posters: [],
};

const LOAD_POSTER: 'LOAD_POSTER' = 'LOAD_POSTER';
const FETCH_POSTER_STARTED: 'FETCH_POSTER_STARTED' = 'FETCH_POSTER_STARTED';
const FETCH_POSTER_FAILED: 'FETCH_POSTER_FAILED' = 'FETCH_POSTER_FAILED';

type AddPosterAction = {|
  type: typeof LOAD_POSTER,
  poster: Poster,
|};

export const addPoster = (poster: Poster): AddPosterAction => {
  return { type: LOAD_POSTER, poster };
};

type FetchPosterStartedAction = {|
  type: typeof FETCH_POSTER_STARTED,
|};

const fetchPosterStarted = (): FetchPosterStartedAction => ({
  type: FETCH_POSTER_STARTED,
});

type FetchPosterFailedAction = {|
  type: typeof FETCH_POSTER_FAILED,
|};

const fetchPosterFailed = (): FetchPosterFailedAction => ({
  type: FETCH_POSTER_FAILED,
});

export const fetchPosterData = (paulingPosterUrl: string): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch(fetchPosterStarted());

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
        Reactotron.log({ message: 'addPoster', poster });

        dispatch(NavigationActions.navigate({
          routeName: 'Poster',
          params: poster,
        }));
      })
      .catch((errorMessage, statusCode) => {
        dispatch(fetchPosterFailed());

        Reactotron.error({
          message: 'fetchPosterFailed',
          errorMessage,
          statusCode,
        });
      });
  };
};

export type Action =
  | AddPosterAction
  | FetchPosterStartedAction
  | FetchPosterFailedAction;

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_POSTER:
      return {
        ...state,
        loading: false,
        posters: state.posters.concat([action.poster]),
      };

    case FETCH_POSTER_STARTED:
      return {
        ...state,
        errored: false,
        loading: true,
      };

    case FETCH_POSTER_FAILED:
      return {
        ...state,
        errored: true,
        loading: false,
      };

    default:
      return state;
  }
}
