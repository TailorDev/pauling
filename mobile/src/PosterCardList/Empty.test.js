import React from 'react';
import { shallow } from 'enzyme';

import Empty from 'app/PosterCardList/Empty';

describe(__filename, () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Empty />);
    expect(wrapper).toMatchSnapshot();
  });
});
