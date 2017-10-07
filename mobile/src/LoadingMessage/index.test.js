import React from 'react';
import { shallow } from 'enzyme';

import LoadingMessage from 'app/LoadingMessage';

describe('LoadingMessage', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <LoadingMessage>
        Some content to explain why it is loading.
      </LoadingMessage>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
