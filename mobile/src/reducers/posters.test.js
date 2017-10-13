import { REHYDRATE } from 'redux-persist/constants';

import reducer, {
  loadPoster,
  fetchPoster,
  fetchPosterStarted,
  fetchPosterFailed,
  initialState,
} from 'app/reducers/posters';
import configureStore from 'app/store/configureStore';
import { createFakePoster } from 'tests/helpers';

describe(__filename, () => {
  describe('reducer', () => {
    it('initializes properly', () => {
      const state = reducer(undefined, {});
      expect(state).toEqual(initialState);
    });

    it('ignores unrelated actions', () => {
      const state = reducer(undefined, fetchPosterStarted());
      const newState = reducer(state, { type: 'UNRELATED' });
      expect(newState).toEqual(state);
    });

    it('keeps the unicity of the list of posters', () => {
      const state = reducer(undefined, loadPoster(createFakePoster()));
      const newState = reducer(state, loadPoster(createFakePoster()));
      expect(newState.posters).toHaveLength(1);
    });

    it('resets the loading attribute on REHYDRATE', () => {
      const state = reducer(undefined, fetchPosterStarted());
      expect(state.loading).toEqual(true);

      const newState = reducer(state, { type: REHYDRATE, payload: {} });
      expect(newState.loading).toEqual(false);
    });

    it('resets the errored attribute on REHYDRATE', () => {
      const state = reducer(undefined, fetchPosterFailed());
      expect(state.errored).toEqual(true);

      const newState = reducer(state, { type: REHYDRATE, payload: {} });
      expect(newState.errored).toEqual(false);
    });

    it('does not reset the posters on REHYDRATE', () => {
      const state = reducer(undefined, loadPoster(createFakePoster()));
      expect(state.posters).toHaveLength(1);

      const newState = reducer(undefined, {
        type: REHYDRATE,
        payload: {
          posters: state,
        },
      });
      expect(newState).toEqual(state);
    });
  });

  describe('fetchPoster', () => {
    it('calls the API to add a poster', async () => {
      const store = configureStore();
      const url = 'http://example.org/poster';
      const poster = createFakePoster();

      fetchMock.get(
        url,
        {
          poster,
        },
        {
          header: { Accept: 'application/json' },
        }
      );
      fetchMock.get(poster.download_url, 'cached-file-name');

      await store.dispatch(fetchPoster(url));

      const { errored, loading, posters } = store.getState().posters;

      expect(errored).toEqual(false);
      expect(loading).toEqual(false);
      expect(posters).toHaveLength(1);
      expect(posters[0]).toHaveProperty(
        'cached_file',
        `/path/to/cache/dir/${poster.id}.pdf`
      );
    });

    it('indicates an error when returns a 404', async () => {
      const store = configureStore();
      const url = 'http://example.org/poster';

      fetchMock.get(url, 404);

      await store.dispatch(fetchPoster(url));

      const { errored, loading, posters } = store.getState().posters;

      expect(errored).toEqual(true);
      expect(loading).toEqual(false);
      expect(posters).toHaveLength(0);
    });
  });
});
