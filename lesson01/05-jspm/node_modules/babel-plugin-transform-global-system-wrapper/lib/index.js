'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  var requireIdentifier = t.identifier('$__require');
  var globalIdentifier = t.identifier('$__global');

  var buildTemplate = (0, _babelTemplate2.default)('\n    SYSTEM_GLOBAL.registerDynamic(MODULE_NAME, [DEPS], false, BODY);\n  ');

  var buildFactory = (0, _babelTemplate2.default)('\n    (function ($__require, $__exports, $__module) {\n      var _retrieveGlobal = SYSTEM_GLOBAL.get("@@global-helpers").prepareGlobal($__module.id, EXPORT_NAME, GLOBALS);\n      (BODY)(this)\n      return _retrieveGlobal();\n    })\n  ');

  var buildGlobal = (0, _babelTemplate2.default)('\n    $__global[NAME] = VALUE;\n  ');

  return {
    visitor: {
      Program: {
        enter: function enter(_ref2) {
          var scope = _ref2.scope;

          // "import" existing global variables values as `var foo = $__global["foo"];`
          var bindings = scope.getAllBindingsOfKind('var');
          for (var name in bindings) {
            var binding = bindings[name];
            scope.push({
              id: binding.identifier,
              init: t.memberExpression(globalIdentifier, t.stringLiteral(name), true)
            });
          }
        },
        exit: function exit(_ref3, _ref4) {
          var node = _ref3.node;
          var scope = _ref3.scope;
          var _ref4$opts = _ref4.opts;
          var opts = _ref4$opts === undefined ? {} : _ref4$opts;
          var moduleName = opts.moduleName;

          moduleName = moduleName ? t.stringLiteral(moduleName) : null;

          var _opts$deps = opts.deps;
          var deps = _opts$deps === undefined ? [] : _opts$deps;

          deps = deps.map(function (d) {
            return t.stringLiteral(d);
          });

          var exportName = opts.exportName;

          exportName = exportName ? t.stringLiteral(exportName) : t.nullLiteral();

          var globals = opts.globals;

          if (globals && Object.keys(globals).length) {
            var properties = Object.keys(globals).filter(function (g) {
              return globals[g];
            }).map(function (g) {
              var value = t.callExpression(requireIdentifier, [t.stringLiteral(globals[g])]);
              return t.objectProperty(t.stringLiteral(g), value);
            });
            globals = t.objectExpression(properties);
          }

          var bindings = scope.getAllBindings();
          for (var name in bindings) {
            var binding = bindings[name];
            var expression = buildGlobal({
              NAME: t.stringLiteral(name),
              VALUE: binding.identifier
            });
            if (binding.kind === 'var') {
              // for globals defined as "var x = 5;" in outer scope, add "$__global.x = x;" at end
              node.body.push(expression);
            } else if (binding.kind === 'hoisted') {
              // hoist function declaration assignments to the global
              node.body.unshift(expression);
            }
          }

          var wrapper = t.functionExpression(null, [globalIdentifier], t.blockStatement(node.body, node.directives));
          node.directives = [];

          var systemGlobal = t.identifier(opts.systemGlobal || "System");

          var factory = buildFactory({
            SYSTEM_GLOBAL: systemGlobal,
            EXPORT_NAME: exportName,
            GLOBALS: globals || t.nullLiteral(),
            BODY: wrapper
          });

          node.body = [buildTemplate({
            SYSTEM_GLOBAL: systemGlobal,
            MODULE_NAME: moduleName,
            DEPS: deps,
            BODY: factory
          })];
        }
      }
    }
  };
};

var _babelTemplate = require('babel-template');

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }