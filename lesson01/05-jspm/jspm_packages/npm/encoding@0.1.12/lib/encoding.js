/* */ 
(function(Buffer) {
  'use strict';
  var iconvLite = require('iconv-lite');
  var Iconv = require('./iconv-loader');
  module.exports.convert = convert;
  function convert(str, to, from, useLite) {
    from = checkEncoding(from || 'UTF-8');
    to = checkEncoding(to || 'UTF-8');
    str = str || '';
    var result;
    if (from !== 'UTF-8' && typeof str === 'string') {
      str = new Buffer(str, 'binary');
    }
    if (from === to) {
      if (typeof str === 'string') {
        result = new Buffer(str);
      } else {
        result = str;
      }
    } else if (Iconv && !useLite) {
      try {
        result = convertIconv(str, to, from);
      } catch (E) {
        console.error(E);
        try {
          result = convertIconvLite(str, to, from);
        } catch (E) {
          console.error(E);
          result = str;
        }
      }
    } else {
      try {
        result = convertIconvLite(str, to, from);
      } catch (E) {
        console.error(E);
        result = str;
      }
    }
    if (typeof result === 'string') {
      result = new Buffer(result, 'utf-8');
    }
    return result;
  }
  function convertIconv(str, to, from) {
    var response,
        iconv;
    iconv = new Iconv(from, to + '//TRANSLIT//IGNORE');
    response = iconv.convert(str);
    return response.slice(0, response.length);
  }
  function convertIconvLite(str, to, from) {
    if (to === 'UTF-8') {
      return iconvLite.decode(str, from);
    } else if (from === 'UTF-8') {
      return iconvLite.encode(str, to);
    } else {
      return iconvLite.encode(iconvLite.decode(str, from), to);
    }
  }
  function checkEncoding(name) {
    return (name || '').toString().trim().replace(/^latin[\-_]?(\d+)$/i, 'ISO-8859-$1').replace(/^win(?:dows)?[\-_]?(\d+)$/i, 'WINDOWS-$1').replace(/^utf[\-_]?(\d+)$/i, 'UTF-$1').replace(/^ks_c_5601\-1987$/i, 'CP949').replace(/^us[\-_]?ascii$/i, 'ASCII').toUpperCase();
  }
})(require('buffer').Buffer);
