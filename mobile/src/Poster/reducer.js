/* @flow */
import type { Poster } from '../types';

// State
type State = {
  posters: Array<Poster>,
};

const initialState: State = {
  posters: [],
};

// Actions
const ADD_POSTER = 'pauling/poster/ADD_POSTER';

// Action Creators
export function addPoster(poster: Poster) {
  return { type: ADD_POSTER, poster };
}

// Reducer
export default function reducer(
  state: Object = initialState,
  action: Object = {}
) {
  switch (action.type) {
    case ADD_POSTER:
      return {
        ...state,
        posters: state.posters.concat([action.poster]),
      };
    default:
      return state;
  }
}
