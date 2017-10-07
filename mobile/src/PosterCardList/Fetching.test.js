import React from 'react';
import { shallow } from 'enzyme';

import Fetching from 'app/PosterCardList/Fetching';

describe('Fetching', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Fetching />);
    expect(wrapper).toMatchSnapshot();
  });
});
