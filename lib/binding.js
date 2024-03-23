import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// ESM does not support loading .node files, at least in Node.js
// https://github.com/nodejs/node/issues/40541
const addon = require('../build/Release/url-wintercg-native.node');

export class UrlWintercg {
  constructor(name) {
    this._addonInstance = new addon.UrlWintercg(name);
  }

  greet(str) {
    return this._addonInstance.greet(str);
  }
}
