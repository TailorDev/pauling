import { Platform } from 'react-native';

import StyleSheet from 'app/PaulingStyleSheet';

describe(__filename, () => {
  describe('create', () => {
    it('throws an error if argument is missing', () => {
      expect(() => {
        StyleSheet.create();
      }).toThrow('styles argument is required');
    });

    it('creates a React-Native StyleSheet', () => {
      const styles = StyleSheet.create({});
      expect(styles).toEqual({});
    });

    it('updates the styles for iOS', () => {
      Platform.OS = 'ios';

      const styles = StyleSheet.create({
        Component: {
          color: '#base',
          android: {
            color: '#android',
          },
          ios: {
            color: '#ios',
          },
        },
      });
      expect(styles).toEqual({
        Component: {
          color: '#ios',
        },
      });
    });

    it('updates the styles for Android', () => {
      Platform.OS = 'android';

      const styles = StyleSheet.create({
        Component: {
          color: '#base',
          android: {
            color: '#android',
          },
          ios: {
            color: '#ios',
          },
        },
      });
      expect(styles).toEqual({
        Component: {
          color: '#android',
        },
      });
    });

    it('does not return the ios/android object styles', () => {
      const styles = StyleSheet.create({
        Component: {
          android: {},
          ios: {},
        },
      });

      expect(styles).not.toHaveProperty('Component.android');
      expect(styles).not.toHaveProperty('Component.ios');
    });
  });
});
