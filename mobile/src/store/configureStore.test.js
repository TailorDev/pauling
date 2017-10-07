import configureStore from 'app/store/configureStore';

describe(__filename, () => {
  it('sets the reducers', () => {
    const store = configureStore();
    expect(Object.keys(store.getState()).sort()).toEqual([
      'navigation',
      'posters',
    ]);
  });
});
