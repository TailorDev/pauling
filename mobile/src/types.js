/* @flow */
import Moment from 'moment';


export type Poster = {
  key: string,
  title: string,
  authors: string,
  thumbnailUrl: string,
  savedAt: Moment,
}
