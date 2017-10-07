import reducer, {
  fetchPosterData,
  fetchPosterStarted,
  initialState,
} from 'app/reducers/posters';
import configureStore from 'app/store/configureStore';
import { createFakePoster } from 'tests/helper';

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
  });

  describe('fetchPosterData', () => {
    it('calls the API to add a poster', async () => {
      const store = configureStore();
      const url = 'http://example.org/poster';

      fetchMock.get(
        url,
        {
          poster: createFakePoster(),
        },
        {
          header: { Accept: 'application/json' },
        }
      );

      await store.dispatch(fetchPosterData(url));

      const { errored, loading, posters } = store.getState().posters;
      expect(errored).toEqual(false);
      expect(loading).toEqual(false);
      expect(posters).toHaveLength(1);
    });

    it('calls the API to add a poster', async () => {
      const store = configureStore();
      const url = 'http://example.org/poster';

      fetchMock.get(url, 404);

      await store.dispatch(fetchPosterData(url));

      const { errored, loading, posters } = store.getState().posters;
      expect(errored).toEqual(true);
      expect(loading).toEqual(false);
      expect(posters).toHaveLength(0);
    });
  });
});
