import { constants } from 'node:os';
import { dlopen } from 'node:process';
import { fileURLToPath } from 'node:url';

const module = { exports: {} };

// To load .node files, is generally recommended to use require() over dlopen(),
// except in the case of an ESM project.
// https://nodejs.org/docs/latest/api/process.html#processdlopenmodule-filename-flags
dlopen(
  module,
  fileURLToPath(
    new URL('../build/Release/url-wintercg-native.node', import.meta.url),
  ),
  constants.dlopen.RTLD_NOW,
);

const addon = module.exports;

export class UrlWintercg {
  constructor(name) {
    this._addonInstance = new addon.UrlWintercg(name);
  }

  greet(str) {
    return this._addonInstance.greet(str);
  }
}
