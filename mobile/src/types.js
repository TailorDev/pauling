/* @flow */
import Moment from 'moment';

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
  savedAt: Moment,
}
