import React from 'react';
import { shallow } from 'enzyme';
import { Fab } from 'native-base';

import ActionMenu from 'app/ActionMenu';

describe(__filename, () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ActionMenu />);
    expect(wrapper.find(Fab)).toHaveLength(1);
  });

  it('navigates to QRScan screen on press', () => {
    const navigate = sinon.stub();
    const wrapper = shallow(
      <ActionMenu
        navigation={{ navigate }}
      />
    );

    wrapper.simulate('press');

    sinon.assert.callCount(navigate, 1);
    sinon.assert.calledWith(navigate, 'QRScan');
  });
});
