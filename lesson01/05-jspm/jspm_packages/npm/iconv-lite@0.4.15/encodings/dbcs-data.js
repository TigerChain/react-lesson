/* */ 
"use strict";
module.exports = {
  'shiftjis': {
    type: '_dbcs',
    table: function() {
      return require('./tables/shiftjis.json!systemjs-json');
    },
    encodeAdd: {
      '\u00a5': 0x5C,
      '\u203E': 0x7E
    },
    encodeSkipVals: [{
      from: 0xED40,
      to: 0xF940
    }]
  },
  'csshiftjis': 'shiftjis',
  'mskanji': 'shiftjis',
  'sjis': 'shiftjis',
  'windows31j': 'shiftjis',
  'ms31j': 'shiftjis',
  'xsjis': 'shiftjis',
  'windows932': 'shiftjis',
  'ms932': 'shiftjis',
  '932': 'shiftjis',
  'cp932': 'shiftjis',
  'eucjp': {
    type: '_dbcs',
    table: function() {
      return require('./tables/eucjp.json!systemjs-json');
    },
    encodeAdd: {
      '\u00a5': 0x5C,
      '\u203E': 0x7E
    }
  },
  'gb2312': 'cp936',
  'gb231280': 'cp936',
  'gb23121980': 'cp936',
  'csgb2312': 'cp936',
  'csiso58gb231280': 'cp936',
  'euccn': 'cp936',
  'windows936': 'cp936',
  'ms936': 'cp936',
  '936': 'cp936',
  'cp936': {
    type: '_dbcs',
    table: function() {
      return require('./tables/cp936.json!systemjs-json');
    }
  },
  'gbk': {
    type: '_dbcs',
    table: function() {
      return require('./tables/cp936.json!systemjs-json').concat(require('./tables/gbk-added.json!systemjs-json'));
    }
  },
  'xgbk': 'gbk',
  'isoir58': 'gbk',
  'gb18030': {
    type: '_dbcs',
    table: function() {
      return require('./tables/cp936.json!systemjs-json').concat(require('./tables/gbk-added.json!systemjs-json'));
    },
    gb18030: function() {
      return require('./tables/gb18030-ranges.json!systemjs-json');
    },
    encodeSkipVals: [0x80],
    encodeAdd: {'€': 0xA2E3}
  },
  'chinese': 'gb18030',
  'windows949': 'cp949',
  'ms949': 'cp949',
  '949': 'cp949',
  'cp949': {
    type: '_dbcs',
    table: function() {
      return require('./tables/cp949.json!systemjs-json');
    }
  },
  'cseuckr': 'cp949',
  'csksc56011987': 'cp949',
  'euckr': 'cp949',
  'isoir149': 'cp949',
  'korean': 'cp949',
  'ksc56011987': 'cp949',
  'ksc56011989': 'cp949',
  'ksc5601': 'cp949',
  'windows950': 'cp950',
  'ms950': 'cp950',
  '950': 'cp950',
  'cp950': {
    type: '_dbcs',
    table: function() {
      return require('./tables/cp950.json!systemjs-json');
    }
  },
  'big5': 'big5hkscs',
  'big5hkscs': {
    type: '_dbcs',
    table: function() {
      return require('./tables/cp950.json!systemjs-json').concat(require('./tables/big5-added.json!systemjs-json'));
    },
    encodeSkipVals: [0xa2cc]
  },
  'cnbig5': 'big5hkscs',
  'csbig5': 'big5hkscs',
  'xxbig5': 'big5hkscs'
};
