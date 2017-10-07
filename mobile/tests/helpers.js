/* @flow */
import type { BarCodeData } from 'app/types';

export const createFakePoster = () => {
  return {
    abstract: 'some abstract',
    authors: 'Rebecca Bryant, Holly Mercer',
    created_at: '2017-08-09T11:06:56.185248',
    download_url: 'https://ndownloader.figshare.com/files/9011278',
    id: 'a33a749e-d281-4cd9-a05b-8dc0cc07ece2',
    presented_at: 'some conference',
    saved_at: '2017-10-01T11:06:56.185248',
    source_url: 'http://source.example.org',
    thumbnail_url: 'http://thumbnail.example.org',
    title: 'The Value Proposition of Libraries in Research Information Management'
  };
};

export const createFakeBarCodeData = (
  data: string = 'some-data'
): BarCodeData => ({
  data,
  type: 'qr',
});
