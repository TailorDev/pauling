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

export const initialState: State = {
  errored: false,
  loading: false,
  posters: [],
};

const LOAD_POSTER: 'LOAD_POSTER' = 'LOAD_POSTER';
const FETCH_POSTER_STARTED: 'FETCH_POSTER_STARTED' = 'FETCH_POSTER_STARTED';
const FETCH_POSTER_FAILED: 'FETCH_POSTER_FAILED' = 'FETCH_POSTER_FAILED';

type LoadPosterAction = {|
  type: typeof LOAD_POSTER,
  poster: Poster,
|};

export const loadPoster = (poster: Poster): LoadPosterAction => {
  return { type: LOAD_POSTER, poster };
};

type FetchPosterStartedAction = {|
  type: typeof FETCH_POSTER_STARTED,
|};

export const fetchPosterStarted = (): FetchPosterStartedAction => ({
  type: FETCH_POSTER_STARTED,
});

type FetchPosterFailedAction = {|
  type: typeof FETCH_POSTER_FAILED,
|};

export const fetchPosterFailed = (): FetchPosterFailedAction => ({
  type: FETCH_POSTER_FAILED,
});

export const fetchPoster = (paulingPosterURL: string): ThunkAction => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPosterStarted());

    try {
      const response = await RNFetchBlob.fetch('GET', paulingPosterURL, {
        Accept: 'application/json',
      });
      const jsonData = await response.json();
      const poster = {
        ...jsonData.poster,
        saved_at: new Date().toLocaleString(),
      };

      dispatch(loadPoster(poster));
      Reactotron.log({ message: 'loadPoster', poster });

      dispatch(
        NavigationActions.navigate({
          routeName: 'Poster',
          params: poster,
        })
      );
    } catch (error) {
      dispatch(fetchPosterFailed());

      Reactotron.error({
        message: 'fetchPosterFailed',
        error,
      });
    }
  };
};

export type Action =
  | LoadPosterAction
  | FetchPosterStartedAction
  | FetchPosterFailedAction;

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_POSTER: {
      const poster = action.poster;

      let posters = state.posters;
      if (!posters.find(p => p.id === poster.id)) {
        posters = posters.concat([action.poster]);
      }

      return {
        ...state,
        loading: false,
        posters,
      };
    }

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
