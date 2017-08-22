/* @flow */
import Moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob';
import { Toast } from 'native-base';
import type { Action, ThunkAction, Poster } from '../types';

// State
type State = {
  isFetchingPosterData: boolean,
  posters: Array<Poster>,
}

const initialState: State = {
  isFetchingPosterData: false,
  posters: [
    {
      key: '5ef45c84-84b7-4f7c-9b53-336970cd5759',
      title: 'Imperfect centered sites - a new mode of miRNA binding',
      thumbnailUrl: 'https://s3-eu-west-1.amazonaws.com/pfigshare-u-previews/1710259/thumb.png',
      PDFUrl: 'https://ndownloader.figshare.com/files/1710259',
      authors: 'Nicole Cloonan',
      savedAt: Moment()
    },
    {
      key: '2579ef1b-8266-4363-9ab3-2448eef068c2',
      title: 'The Value Proposition of Libraries in Research Information Management',
      thumbnailUrl: 'https://s3-eu-west-1.amazonaws.com/pfigshare-u-previews/9011278/thumb.png',
      PDFUrl: 'https://ndownloader.figshare.com/files/9011278',
      authors: 'Rebecca Bryant, Holly Mercer',
      savedAt: Moment()
    },
  ],
};

// Actions
export const FETCH_POSTER_DATA_STARTED = 'pauling/poster/FETCH_POSTER_DATA_STARTED';
export const FETCH_POSTER_DATA_SUCCEEDED = 'pauling/poster/FETCH_POSTER_DATA_SUCCEEDED';
export const FETCH_POSTER_DATA_FAILED = 'pauling/poster/FETCH_DATA_POSTER_FAILED';
export const ADD_POSTER = 'pauling/poster/ADD_POSTER';


// Action Creators
export function fetchPosterData(paulingPosterUrl): ThunkAction {
  return (dispatch: Function) => {
    dispatch({ type: FETCH_POSTER_DATA_STARTED });

    RNFetchBlob.fetch(
      'GET',
      paulingPosterUrl,
      {
        Accept: 'application/json',
      })
      .then((response) => {
        const data = response.json();
        dispatch({ type: FETCH_POSTER_DATA_SUCCEEDED });
        dispatch(addPoster(data.poster));
        Toast.show({
          text: 'Poster added with success!',
          position: 'bottom',
          buttonText: 'Okay'
        });
      })
      .catch((errorMessage, statusCode) => {
        dispatch({ type: FETCH_POSTER_DATA_FAILED });
        const message = 'Cannot fetch poster data. Please try again later.';
        Toast.show({
          text: message,
          position: 'bottom',
          buttonText: 'Okay'
        });
        console.error(message, errorMessage, statusCode);
      });
  };
}

function addPoster(poster) {
  return { type: ADD_POSTER, poster };
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

    case ADD_POSTER:
      return {
        ...state,
        posters: state.posters.concat([action.poster]),
      };

    default:
      return state;
  }
}
