import fs from 'fs';
import path from 'path';

const packageJson = JSON.parse(fs.readFileSync(path.join('package.json')));

describe(__filename, () => {
  Object.keys(packageJson.devDependencies).forEach((key) => {
    it(`should have devDependencies[${key}] version prefixed with "^"`, () => {
      expect(packageJson.devDependencies[key])
        .toEqual(expect.stringMatching(/^(\^|git)/));
    });
  });

  Object.keys(packageJson.dependencies).forEach((key) => {
    it(`should have dependencies[${key}] version prefixed with a number`, () => {
      expect(packageJson.dependencies[key])
        .toEqual(expect.stringMatching(/^\d/));
    });
  });
});
