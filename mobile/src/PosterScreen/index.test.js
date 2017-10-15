import React from 'react';
import { shallow } from 'enzyme';
import { ScrollView } from 'react-native';
import { Button } from 'native-base';

import PosterScreen from 'app/PosterScreen';
import styles from 'app/PosterScreen/styles';
import { loadPoster } from 'app/reducers/posters';
import configureStore from 'app/store/configureStore';
import { createFakePoster } from 'tests/helpers';

describe(__filename, () => {
  // See: https://github.com/facebook/react-native/issues/12440;
  jest.mock('WebView', () => 'WebView');

  const getNavigation = params => ({
    state: { params },
  });

  const getPoster = () => {
    const store = configureStore();
    store.dispatch(loadPoster(createFakePoster()));

    return store.getState().posters.posters[0];
  };

  const render = () => {
    const poster = getPoster();

    return shallow(<PosterScreen navigation={getNavigation(poster)} />);
  };

  it('renders correctly', () => {
    const wrapper = render();
    expect(wrapper.find({ testID: 'Poster' })).toHaveLength(1);
    // Poster component is "visible".
    expect(wrapper.find({ testID: 'Poster' })).toHaveProp('style', [
      styles.Poster,
      { display: 'flex' },
    ]);
    expect(wrapper.find(ScrollView)).toHaveLength(0);
    expect(wrapper.find(Button).at(0)).toHaveProp('active', true);
    expect(wrapper.find(Button).at(1)).toHaveProp('active', false);
  });

  it('shows the information tab when selected', () => {
    const wrapper = render();

    // Tab information can be selected by pressing the second button in footer.
    wrapper.find(Button).at(1).simulate('press');

    expect(wrapper.find(Button).at(0)).toHaveProp('active', false);
    expect(wrapper.find(Button).at(1)).toHaveProp('active', true);

    // Poster does not disappear so that we don't have to load it entirely
    // again when it is re-selected.
    expect(wrapper.find({ testID: 'Poster' })).toHaveLength(1);
    expect(wrapper.find({ testID: 'Poster' })).toHaveProp('style', [
      styles.Poster,
      { display: 'none' },
    ]);
    expect(wrapper.find(ScrollView)).toHaveLength(1);

    // Poster can be selected by pressing the first button in footer.
    wrapper.find(Button).at(0).simulate('press');
    expect(wrapper.find({ testID: 'Poster' })).toHaveLength(1);
    expect(wrapper.find({ testID: 'Poster' })).toHaveProp('style', [
      styles.Poster,
      { display: 'flex' },
    ]);
  });

  it('displays the poster title in navigation bar', () => {
    const poster = getPoster();
    const navigation = getNavigation(poster);
    const options = PosterScreen.navigationOptions({ navigation });

    expect(options).toEqual({
      title: poster.title,
      headerStyle: styles.Header,
    });
  });
});
