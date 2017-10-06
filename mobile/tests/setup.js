import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import 'jest-enzyme';

Enzyme.configure({ adapter: new Adapter() });

// Do not use development environment in the tests.
global.__DEV__ = false;

// Setup sinon global to be a sandbox which is restored after each test.
const realSinon = sinon;

global.sinon = realSinon.sandbox.create();
global.sinon.createStubInstance = realSinon.createStubInstance;
global.sinon.format = realSinon.format;
global.sinon.assert = realSinon.assert;

afterEach(() => {
  global.sinon.restore();
});

jest.mock('react-native-fetch-blob', () => ({
  DocumentDir: {},
}));

jest.mock('react-native-camera', () => ({
  constants: {
    Aspect: {},
  },
}));
