/* @flow */
import type {
  Action as PostersAction,
  State as PostersState,
} from 'app/reducers/posters';
import type { State as NavigationState } from 'app/reducers/navigation';

export type Action = {|
  ...PostersAction,
|};

export type State = {|
  posters: PostersState,
  navigation: NavigationState,
|};

// Taken from: https://github.com/fbsamples/f8app
export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

export type NavigationOptions = {
  header?: null | any,
  title: string | null,
};

export type RehydrateAction = {|
  type: 'REHYDRATE',
  payload: State,
|};

export type Poster = {|
  id: string,
  title: string,
  thumbnail_url: string,
  download_url: string,
  authors: string,
  abstract: string,
  saved_at: string,
|};

export type BarCodeData = {|
  data: string,
  type: string,
|};
