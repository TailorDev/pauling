/* @flow */
import type {
  Action as PostersAction,
  State as PostersState,
} from 'reducers/posters';

export type Action = {|
  ...PostersAction,
|};

export type State = {|
  posters: PostersState,
|};

// Taken from: https://github.com/fbsamples/f8app
export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

export type Navigation = {
  navigate: Function,
  state: Object,
};

export type NavigationOptions = {
  title: string,
};

export type Poster = {|
  id: string,
  title: string,
  thumbnail_url: string,
  download_url: string,
  authors: string,
  abstract: string,
  saved_at: string,
|};
