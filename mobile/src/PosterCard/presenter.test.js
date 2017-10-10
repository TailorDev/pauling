import React from 'react';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';

import PosterCard from 'app/PosterCard';
import { loadPoster } from 'app/reducers/posters';
import configureStore from 'app/store/configureStore';
import { createFakePoster } from 'tests/helpers';

describe(__filename, () => {
  const render = params => {
    const store = configureStore();

    store.dispatch(loadPoster(createFakePoster()));
    const poster = store.getState().posters.posters[0];

    const allProps = {
      poster,
      navigation: sinon.stub(),
      ...params,
    };

    return shallow(<PosterCard {...allProps} />);
  };

  it('renders correctly', () => {
    const wrapper = render(<PosterCard />);
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
  });

  it('navigates to Poster screen on press', () => {
    const navigate = sinon.stub();
    const wrapper = render({ navigation: { navigate } });

    wrapper.simulate('press');

    sinon.assert.callCount(navigate, 1);
    sinon.assert.calledWith(navigate, 'Poster');
  });
});
