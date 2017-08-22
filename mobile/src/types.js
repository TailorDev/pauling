/* @flow */
import Moment from 'moment';

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
  key: string,
  title: string,
  authors: string,
  thumbnailUrl: string,
  PDFUrl: string,
  savedAt: Moment,
}
