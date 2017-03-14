/* */ 
'use strict';
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var PhotosMimeType = require('./PhotosMimeType');
var createArrayFromMixed = require('./createArrayFromMixed');
var emptyFunction = require('./emptyFunction');
var CR_LF_REGEX = new RegExp('\r\n', 'g');
var LF_ONLY = '\n';
var RICH_TEXT_TYPES = {
  'text/rtf': 1,
  'text/html': 1
};
function getFileFromDataTransfer(item) {
  if (item.kind == 'file') {
    return item.getAsFile();
  }
}
var DataTransfer = function() {
  function DataTransfer(data) {
    _classCallCheck(this, DataTransfer);
    this.data = data;
    this.types = data.types ? createArrayFromMixed(data.types) : [];
  }
  DataTransfer.prototype.isRichText = function isRichText() {
    if (this.getHTML() && this.getText()) {
      return true;
    }
    if (this.isImage()) {
      return false;
    }
    return this.types.some(function(type) {
      return RICH_TEXT_TYPES[type];
    });
  };
  DataTransfer.prototype.getText = function getText() {
    var text;
    if (this.data.getData) {
      if (!this.types.length) {
        text = this.data.getData('Text');
      } else if (this.types.indexOf('text/plain') != -1) {
        text = this.data.getData('text/plain');
      }
    }
    return text ? text.replace(CR_LF_REGEX, LF_ONLY) : null;
  };
  DataTransfer.prototype.getHTML = function getHTML() {
    if (this.data.getData) {
      if (!this.types.length) {
        return this.data.getData('Text');
      } else if (this.types.indexOf('text/html') != -1) {
        return this.data.getData('text/html');
      }
    }
  };
  DataTransfer.prototype.isLink = function isLink() {
    return this.types.some(function(type) {
      return type.indexOf('Url') != -1 || type.indexOf('text/uri-list') != -1 || type.indexOf('text/x-moz-url');
    });
  };
  DataTransfer.prototype.getLink = function getLink() {
    if (this.data.getData) {
      if (this.types.indexOf('text/x-moz-url') != -1) {
        var url = this.data.getData('text/x-moz-url').split('\n');
        return url[0];
      }
      return this.types.indexOf('text/uri-list') != -1 ? this.data.getData('text/uri-list') : this.data.getData('url');
    }
    return null;
  };
  DataTransfer.prototype.isImage = function isImage() {
    var isImage = this.types.some(function(type) {
      return type.indexOf('application/x-moz-file') != -1;
    });
    if (isImage) {
      return true;
    }
    var items = this.getFiles();
    for (var i = 0; i < items.length; i++) {
      var type = items[i].type;
      if (!PhotosMimeType.isImage(type)) {
        return false;
      }
    }
    return true;
  };
  DataTransfer.prototype.getCount = function getCount() {
    if (this.data.hasOwnProperty('items')) {
      return this.data.items.length;
    } else if (this.data.hasOwnProperty('mozItemCount')) {
      return this.data.mozItemCount;
    } else if (this.data.files) {
      return this.data.files.length;
    }
    return null;
  };
  DataTransfer.prototype.getFiles = function getFiles() {
    if (this.data.items) {
      return Array.prototype.slice.call(this.data.items).map(getFileFromDataTransfer).filter(emptyFunction.thatReturnsArgument);
    } else if (this.data.files) {
      return Array.prototype.slice.call(this.data.files);
    } else {
      return [];
    }
  };
  DataTransfer.prototype.hasFiles = function hasFiles() {
    return this.getFiles().length > 0;
  };
  return DataTransfer;
}();
module.exports = DataTransfer;
