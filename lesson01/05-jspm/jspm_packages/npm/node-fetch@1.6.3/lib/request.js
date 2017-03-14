/* */ 
var parse_url = require('url').parse;
var Headers = require('./headers');
var Body = require('./body');
module.exports = Request;
function Request(input, init) {
  var url,
      url_parsed;
  if (!(input instanceof Request)) {
    url = input;
    url_parsed = parse_url(url);
    input = {};
  } else {
    url = input.url;
    url_parsed = parse_url(url);
  }
  init = init || {};
  this.method = init.method || input.method || 'GET';
  this.redirect = init.redirect || input.redirect || 'follow';
  this.headers = new Headers(init.headers || input.headers || {});
  this.url = url;
  this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
  this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
  this.counter = init.counter || input.counter || 0;
  this.agent = init.agent || input.agent;
  Body.call(this, init.body || this._clone(input), {
    timeout: init.timeout || input.timeout || 0,
    size: init.size || input.size || 0
  });
  this.protocol = url_parsed.protocol;
  this.hostname = url_parsed.hostname;
  this.port = url_parsed.port;
  this.path = url_parsed.path;
  this.auth = url_parsed.auth;
}
Request.prototype = Object.create(Body.prototype);
Request.prototype.clone = function() {
  return new Request(this);
};
