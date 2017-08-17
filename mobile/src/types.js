/* @flow */
import Moment from 'moment';

export type Navigation = {
  navigate: Function,
  state: Object,
  addListener: Function,
  removeListener: Function,
};

export type NavigationOptions = {
  title: string,
}

export type Poster = {
  key: string,
  title: string,
  authors: string,
  thumbnailUrl: string,
  savedAt: Moment,
}
