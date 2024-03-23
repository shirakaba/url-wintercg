import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const addon = require('../build/Release/url-wintercg-native.node');

export function UrlWintercg(name) {
  this.greet = function (str) {
    return _addonInstance.greet(str);
  };

  var _addonInstance = new addon.UrlWintercg(name);
}
