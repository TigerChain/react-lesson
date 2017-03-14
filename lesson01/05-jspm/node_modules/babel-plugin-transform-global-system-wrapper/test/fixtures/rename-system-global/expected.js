SystemJS.registerDynamic([], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = SystemJS.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    foo = "bar";
  })(this);

  return _retrieveGlobal();
});
