/* @flow */
import Moment from 'moment';


export type Navigation = {
  navigate: Function,
  addListener: Function,
  removeListener: Function,
};

export type Poster = {
  key: string,
  title: string,
  authors: string,
  thumbnailUrl: string,
  savedAt: Moment,
}
