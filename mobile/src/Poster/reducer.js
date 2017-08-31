/* @flow */
import Moment from 'moment';
import type { Poster } from '../types';

// State
type State = {
  posters: Array<Poster>,
}

const initialState: State = {
  posters: [
    {
      id: '5ef45c84-84b7-4f7c-9b53-336970cd5759',
      title: 'Imperfect centered sites - a new mode of miRNA binding',
      thumbnail_url: 'https://s3-eu-west-1.amazonaws.com/pfigshare-u-previews/1710259/thumb.png',
      download_url: 'https://ndownloader.figshare.com/files/1710259',
      authors: 'Nicole Cloonan',
      saved_at: Moment()
    },
    {
      id: '2579ef1b-8266-4363-9ab3-2448eef068c2',
      title: 'The Value Proposition of Libraries in Research Information Management',
      thumbnail_url: 'https://s3-eu-west-1.amazonaws.com/pfigshare-u-previews/9011278/thumb.png',
      download_url: 'https://ndownloader.figshare.com/files/9011278',
      authors: 'Rebecca Bryant, Holly Mercer',
      saved_at: Moment()
    },
  ],
};

// Actions
const ADD_POSTER = 'pauling/poster/ADD_POSTER';


// Action Creators
export function addPoster(poster: Poster) {
  return { type: ADD_POSTER, poster };
}

// Reducer
export default function reducer(state: Object = initialState, action: Object = {}) {
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
