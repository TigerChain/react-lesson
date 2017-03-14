/* */ 
(function(Buffer) {
  "use strict";
  module.exports = {
    utf8: {
      type: "_internal",
      bomAware: true
    },
    cesu8: {
      type: "_internal",
      bomAware: true
    },
    unicode11utf8: "utf8",
    ucs2: {
      type: "_internal",
      bomAware: true
    },
    utf16le: "ucs2",
    binary: {type: "_internal"},
    base64: {type: "_internal"},
    hex: {type: "_internal"},
    _internal: InternalCodec
  };
  function InternalCodec(codecOptions, iconv) {
    this.enc = codecOptions.encodingName;
    this.bomAware = codecOptions.bomAware;
    if (this.enc === "base64")
      this.encoder = InternalEncoderBase64;
    else if (this.enc === "cesu8") {
      this.enc = "utf8";
      this.encoder = InternalEncoderCesu8;
      if (new Buffer("eda080", 'hex').toString().length == 3) {
        this.decoder = InternalDecoderCesu8;
        this.defaultCharUnicode = iconv.defaultCharUnicode;
      }
    }
  }
  InternalCodec.prototype.encoder = InternalEncoder;
  InternalCodec.prototype.decoder = InternalDecoder;
  var StringDecoder = require('string_decoder').StringDecoder;
  if (!StringDecoder.prototype.end)
    StringDecoder.prototype.end = function() {};
  function InternalDecoder(options, codec) {
    StringDecoder.call(this, codec.enc);
  }
  InternalDecoder.prototype = StringDecoder.prototype;
  function InternalEncoder(options, codec) {
    this.enc = codec.enc;
  }
  InternalEncoder.prototype.write = function(str) {
    return new Buffer(str, this.enc);
  };
  InternalEncoder.prototype.end = function() {};
  function InternalEncoderBase64(options, codec) {
    this.prevStr = '';
  }
  InternalEncoderBase64.prototype.write = function(str) {
    str = this.prevStr + str;
    var completeQuads = str.length - (str.length % 4);
    this.prevStr = str.slice(completeQuads);
    str = str.slice(0, completeQuads);
    return new Buffer(str, "base64");
  };
  InternalEncoderBase64.prototype.end = function() {
    return new Buffer(this.prevStr, "base64");
  };
  function InternalEncoderCesu8(options, codec) {}
  InternalEncoderCesu8.prototype.write = function(str) {
    var buf = new Buffer(str.length * 3),
        bufIdx = 0;
    for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);
      if (charCode < 0x80)
        buf[bufIdx++] = charCode;
      else if (charCode < 0x800) {
        buf[bufIdx++] = 0xC0 + (charCode >>> 6);
        buf[bufIdx++] = 0x80 + (charCode & 0x3f);
      } else {
        buf[bufIdx++] = 0xE0 + (charCode >>> 12);
        buf[bufIdx++] = 0x80 + ((charCode >>> 6) & 0x3f);
        buf[bufIdx++] = 0x80 + (charCode & 0x3f);
      }
    }
    return buf.slice(0, bufIdx);
  };
  InternalEncoderCesu8.prototype.end = function() {};
  function InternalDecoderCesu8(options, codec) {
    this.acc = 0;
    this.contBytes = 0;
    this.accBytes = 0;
    this.defaultCharUnicode = codec.defaultCharUnicode;
  }
  InternalDecoderCesu8.prototype.write = function(buf) {
    var acc = this.acc,
        contBytes = this.contBytes,
        accBytes = this.accBytes,
        res = '';
    for (var i = 0; i < buf.length; i++) {
      var curByte = buf[i];
      if ((curByte & 0xC0) !== 0x80) {
        if (contBytes > 0) {
          res += this.defaultCharUnicode;
          contBytes = 0;
        }
        if (curByte < 0x80) {
          res += String.fromCharCode(curByte);
        } else if (curByte < 0xE0) {
          acc = curByte & 0x1F;
          contBytes = 1;
          accBytes = 1;
        } else if (curByte < 0xF0) {
          acc = curByte & 0x0F;
          contBytes = 2;
          accBytes = 1;
        } else {
          res += this.defaultCharUnicode;
        }
      } else {
        if (contBytes > 0) {
          acc = (acc << 6) | (curByte & 0x3f);
          contBytes--;
          accBytes++;
          if (contBytes === 0) {
            if (accBytes === 2 && acc < 0x80 && acc > 0)
              res += this.defaultCharUnicode;
            else if (accBytes === 3 && acc < 0x800)
              res += this.defaultCharUnicode;
            else
              res += String.fromCharCode(acc);
          }
        } else {
          res += this.defaultCharUnicode;
        }
      }
    }
    this.acc = acc;
    this.contBytes = contBytes;
    this.accBytes = accBytes;
    return res;
  };
  InternalDecoderCesu8.prototype.end = function() {
    var res = 0;
    if (this.contBytes > 0)
      res += this.defaultCharUnicode;
    return res;
  };
})(require('buffer').Buffer);
