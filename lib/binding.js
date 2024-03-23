const addon = require('../build/Release/url-wintercg-native');

function UrlWintercg(name) {
  this.greet = function (str) {
    return _addonInstance.greet(str);
  };

  var _addonInstance = new addon.UrlWintercg(name);
}

module.exports = UrlWintercg;
