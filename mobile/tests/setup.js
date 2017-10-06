import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

// Setup sinon global to be a sandbox which is restored after each test.
const realSinon = sinon;

global.sinon = realSinon.sandbox.create();
global.sinon.createStubInstance = realSinon.createStubInstance;
global.sinon.format = realSinon.format;
global.sinon.assert = realSinon.assert;

afterEach(() => {
  global.sinon.restore();
});
