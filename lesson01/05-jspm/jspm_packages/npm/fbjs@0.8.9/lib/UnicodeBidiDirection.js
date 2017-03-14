/* */ 
(function(process) {
  'use strict';
  var invariant = require('./invariant');
  var NEUTRAL = 'NEUTRAL';
  var LTR = 'LTR';
  var RTL = 'RTL';
  var globalDir = null;
  function isStrong(dir) {
    return dir === LTR || dir === RTL;
  }
  function getHTMLDir(dir) {
    !isStrong(dir) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
    return dir === LTR ? 'ltr' : 'rtl';
  }
  function getHTMLDirIfDifferent(dir, otherDir) {
    !isStrong(dir) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
    !isStrong(otherDir) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`otherDir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
    return dir === otherDir ? null : getHTMLDir(dir);
  }
  function setGlobalDir(dir) {
    globalDir = dir;
  }
  function initGlobalDir() {
    setGlobalDir(LTR);
  }
  function getGlobalDir() {
    if (!globalDir) {
      this.initGlobalDir();
    }
    !globalDir ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Global direction not set.') : invariant(false) : void 0;
    return globalDir;
  }
  var UnicodeBidiDirection = {
    NEUTRAL: NEUTRAL,
    LTR: LTR,
    RTL: RTL,
    isStrong: isStrong,
    getHTMLDir: getHTMLDir,
    getHTMLDirIfDifferent: getHTMLDirIfDifferent,
    setGlobalDir: setGlobalDir,
    initGlobalDir: initGlobalDir,
    getGlobalDir: getGlobalDir
  };
  module.exports = UnicodeBidiDirection;
})(require('process'));
