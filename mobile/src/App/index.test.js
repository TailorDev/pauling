import React from 'react';
import { shallow } from 'enzyme';

import App from 'app/App';
import ActionMenu from 'app/ActionMenu';
import PosterCardList from 'app/PosterCardList';

describe(__filename, () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(PosterCardList)).toHaveLength(1);
    expect(wrapper.find(ActionMenu)).toHaveLength(1);
  });
});
