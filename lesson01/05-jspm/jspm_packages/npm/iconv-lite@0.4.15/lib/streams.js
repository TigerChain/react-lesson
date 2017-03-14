/* */ 
(function(Buffer) {
  "use strict";
  var Transform = require('stream').Transform;
  module.exports = function(iconv) {
    iconv.encodeStream = function encodeStream(encoding, options) {
      return new IconvLiteEncoderStream(iconv.getEncoder(encoding, options), options);
    };
    iconv.decodeStream = function decodeStream(encoding, options) {
      return new IconvLiteDecoderStream(iconv.getDecoder(encoding, options), options);
    };
    iconv.supportsStreams = true;
    iconv.IconvLiteEncoderStream = IconvLiteEncoderStream;
    iconv.IconvLiteDecoderStream = IconvLiteDecoderStream;
    iconv._collect = IconvLiteDecoderStream.prototype.collect;
  };
  function IconvLiteEncoderStream(conv, options) {
    this.conv = conv;
    options = options || {};
    options.decodeStrings = false;
    Transform.call(this, options);
  }
  IconvLiteEncoderStream.prototype = Object.create(Transform.prototype, {constructor: {value: IconvLiteEncoderStream}});
  IconvLiteEncoderStream.prototype._transform = function(chunk, encoding, done) {
    if (typeof chunk != 'string')
      return done(new Error("Iconv encoding stream needs strings as its input."));
    try {
      var res = this.conv.write(chunk);
      if (res && res.length)
        this.push(res);
      done();
    } catch (e) {
      done(e);
    }
  };
  IconvLiteEncoderStream.prototype._flush = function(done) {
    try {
      var res = this.conv.end();
      if (res && res.length)
        this.push(res);
      done();
    } catch (e) {
      done(e);
    }
  };
  IconvLiteEncoderStream.prototype.collect = function(cb) {
    var chunks = [];
    this.on('error', cb);
    this.on('data', function(chunk) {
      chunks.push(chunk);
    });
    this.on('end', function() {
      cb(null, Buffer.concat(chunks));
    });
    return this;
  };
  function IconvLiteDecoderStream(conv, options) {
    this.conv = conv;
    options = options || {};
    options.encoding = this.encoding = 'utf8';
    Transform.call(this, options);
  }
  IconvLiteDecoderStream.prototype = Object.create(Transform.prototype, {constructor: {value: IconvLiteDecoderStream}});
  IconvLiteDecoderStream.prototype._transform = function(chunk, encoding, done) {
    if (!Buffer.isBuffer(chunk))
      return done(new Error("Iconv decoding stream needs buffers as its input."));
    try {
      var res = this.conv.write(chunk);
      if (res && res.length)
        this.push(res, this.encoding);
      done();
    } catch (e) {
      done(e);
    }
  };
  IconvLiteDecoderStream.prototype._flush = function(done) {
    try {
      var res = this.conv.end();
      if (res && res.length)
        this.push(res, this.encoding);
      done();
    } catch (e) {
      done(e);
    }
  };
  IconvLiteDecoderStream.prototype.collect = function(cb) {
    var res = '';
    this.on('error', cb);
    this.on('data', function(chunk) {
      res += chunk;
    });
    this.on('end', function() {
      cb(null, res);
    });
    return this;
  };
})(require('buffer').Buffer);
