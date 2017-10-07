import React from 'react';
import { shallow } from 'enzyme';
import { FlatList } from 'react-native';

import ConnectedPosterCardList from 'app/PosterCardList';
import PosterCardList from 'app/PosterCardList/presenter';
import LoadingMessage from 'app/LoadingMessage';
import {
  addPoster,
  fetchPosterFailed,
  fetchPosterStarted,
} from 'app/reducers/posters';
import configureStore from 'app/store/configureStore';
import { createFakePoster } from 'tests/helpers';

describe('PosterCardList', () => {
  const render = (
    { store = configureStore(), navigation = sinon.stub(), ...params } = {}
  ) => {
    const allProps = {
      store,
      navigation,
      ...params,
    };

    return shallow(<ConnectedPosterCardList {...allProps} />)
      .find(PosterCardList)
      .shallow();
  };

  it('renders correctly', () => {
    const wrapper = render();
    expect(wrapper.find(FlatList)).toHaveLength(1);
  });

  it('renders a FlatList', () => {
    const wrapper = render();
    expect(wrapper.find(FlatList)).toHaveLength(1);
    expect(wrapper.find(FlatList)).toHaveProp('data', []);
  });

  it('passes posters to the FlatList', () => {
    const store = configureStore();
    const poster = createFakePoster();

    store.dispatch(addPoster(poster));

    const wrapper = render({ store });
    expect(wrapper.find(FlatList)).toHaveProp('data', [poster]);
  });

  it('displays a LoadingMessage component while fetching a poster', () => {
    const store = configureStore();
    store.dispatch(fetchPosterStarted());

    const wrapper = render({ store });
    expect(wrapper.find(LoadingMessage)).toHaveLength(1);
  });

  it('shows a Toast when an error has occured', () => {
    const store = configureStore();
    const toastComponent = {
      show: sinon.stub(),
    };

    store.dispatch(fetchPosterFailed());

    render({ store, toastComponent });
    sinon.assert.callCount(toastComponent.show, 1);
  });

  it('renders PosterCard items', () => {
    const store = configureStore();

    store.dispatch(addPoster(createFakePoster()));

    const wrapper = render({ store });
    const posters = wrapper.find(FlatList).prop('data');
    const renderItem = wrapper.find(FlatList).prop('renderItem');

    // TODO: there must be a better way to test this.
    expect(
      renderItem({
        item: posters[0],
      })
    ).toMatchSnapshot();
  });
});
