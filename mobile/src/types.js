/* @flow */
// Taken from: https://github.com/fbsamples/f8app
export type Action = Object;
export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

export type Navigation = {
  navigate: Function,
  state: Object,
};

export type NavigationOptions = {
  title: string,
}

export type Poster = {
  id: string,
  title: string,
  thumbnail_url: string,
  download_url: string,
  authors: string,
  abstract: string,
  saved_at: string,
}
