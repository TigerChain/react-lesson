/* */ 
module.exports = FetchError;
function FetchError(message, type, systemError) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.type = type;
  if (systemError) {
    this.code = this.errno = systemError.code;
  }
}
require('util').inherits(FetchError, Error);
