/* */ 
(function(Buffer) {
  "use strict";
  exports.utf16be = Utf16BECodec;
  function Utf16BECodec() {}
  Utf16BECodec.prototype.encoder = Utf16BEEncoder;
  Utf16BECodec.prototype.decoder = Utf16BEDecoder;
  Utf16BECodec.prototype.bomAware = true;
  function Utf16BEEncoder() {}
  Utf16BEEncoder.prototype.write = function(str) {
    var buf = new Buffer(str, 'ucs2');
    for (var i = 0; i < buf.length; i += 2) {
      var tmp = buf[i];
      buf[i] = buf[i + 1];
      buf[i + 1] = tmp;
    }
    return buf;
  };
  Utf16BEEncoder.prototype.end = function() {};
  function Utf16BEDecoder() {
    this.overflowByte = -1;
  }
  Utf16BEDecoder.prototype.write = function(buf) {
    if (buf.length == 0)
      return '';
    var buf2 = new Buffer(buf.length + 1),
        i = 0,
        j = 0;
    if (this.overflowByte !== -1) {
      buf2[0] = buf[0];
      buf2[1] = this.overflowByte;
      i = 1;
      j = 2;
    }
    for (; i < buf.length - 1; i += 2, j += 2) {
      buf2[j] = buf[i + 1];
      buf2[j + 1] = buf[i];
    }
    this.overflowByte = (i == buf.length - 1) ? buf[buf.length - 1] : -1;
    return buf2.slice(0, j).toString('ucs2');
  };
  Utf16BEDecoder.prototype.end = function() {};
  exports.utf16 = Utf16Codec;
  function Utf16Codec(codecOptions, iconv) {
    this.iconv = iconv;
  }
  Utf16Codec.prototype.encoder = Utf16Encoder;
  Utf16Codec.prototype.decoder = Utf16Decoder;
  function Utf16Encoder(options, codec) {
    options = options || {};
    if (options.addBOM === undefined)
      options.addBOM = true;
    this.encoder = codec.iconv.getEncoder('utf-16le', options);
  }
  Utf16Encoder.prototype.write = function(str) {
    return this.encoder.write(str);
  };
  Utf16Encoder.prototype.end = function() {
    return this.encoder.end();
  };
  function Utf16Decoder(options, codec) {
    this.decoder = null;
    this.initialBytes = [];
    this.initialBytesLen = 0;
    this.options = options || {};
    this.iconv = codec.iconv;
  }
  Utf16Decoder.prototype.write = function(buf) {
    if (!this.decoder) {
      this.initialBytes.push(buf);
      this.initialBytesLen += buf.length;
      if (this.initialBytesLen < 16)
        return '';
      var buf = Buffer.concat(this.initialBytes),
          encoding = detectEncoding(buf, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(encoding, this.options);
      this.initialBytes.length = this.initialBytesLen = 0;
    }
    return this.decoder.write(buf);
  };
  Utf16Decoder.prototype.end = function() {
    if (!this.decoder) {
      var buf = Buffer.concat(this.initialBytes),
          encoding = detectEncoding(buf, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(encoding, this.options);
      var res = this.decoder.write(buf),
          trail = this.decoder.end();
      return trail ? (res + trail) : res;
    }
    return this.decoder.end();
  };
  function detectEncoding(buf, defaultEncoding) {
    var enc = defaultEncoding || 'utf-16le';
    if (buf.length >= 2) {
      if (buf[0] == 0xFE && buf[1] == 0xFF)
        enc = 'utf-16be';
      else if (buf[0] == 0xFF && buf[1] == 0xFE)
        enc = 'utf-16le';
      else {
        var asciiCharsLE = 0,
            asciiCharsBE = 0,
            _len = Math.min(buf.length - (buf.length % 2), 64);
        for (var i = 0; i < _len; i += 2) {
          if (buf[i] === 0 && buf[i + 1] !== 0)
            asciiCharsBE++;
          if (buf[i] !== 0 && buf[i + 1] === 0)
            asciiCharsLE++;
        }
        if (asciiCharsBE > asciiCharsLE)
          enc = 'utf-16be';
        else if (asciiCharsBE < asciiCharsLE)
          enc = 'utf-16le';
      }
    }
    return enc;
  }
})(require('buffer').Buffer);
