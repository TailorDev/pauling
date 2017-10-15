import React from 'react';
import { shallow } from 'enzyme';

import AppScreen from 'app/AppScreen';
import ActionMenu from 'app/ActionMenu';
import PosterCardList from 'app/PosterCardList';

describe(__filename, () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AppScreen />);
    expect(wrapper.find(PosterCardList)).toHaveLength(1);
    expect(wrapper.find(ActionMenu)).toHaveLength(1);
  });

  it('disables the navigation bar', () => {
    const options = AppScreen.navigationOptions();

    expect(options).toEqual({
      header: null,
      title: null,
    });
  });
});
