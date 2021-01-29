"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.VERSION = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var processArgv = function processArgv() {
  return typeof Deno !== "undefined" && Deno.args || typeof process !== "undefined" && process.argv.slice(2) || [];
};

var DocoptLanguageError = /*#__PURE__*/function (_Error) {
  _inherits(DocoptLanguageError, _Error);

  var _super = _createSuper(DocoptLanguageError);

  function DocoptLanguageError() {
    _classCallCheck(this, DocoptLanguageError);

    return _super.apply(this, arguments);
  }

  return DocoptLanguageError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var Exit = /*#__PURE__*/function (_Error2) {
  _inherits(Exit, _Error2);

  var _super2 = _createSuper(Exit);

  function Exit() {
    var _this;

    var _message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    _classCallCheck(this, Exit);

    _this = _super2.call(this);
    _this._message = _message;
    return _this;
  }

  _createClass(Exit, [{
    key: "message",
    get: function get() {
      return "".concat(this._message, "\n").concat(Exit.usage || "").trim();
    }
  }]);

  return Exit;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var uniqueMap = function uniqueMap(arr) {
  var m = new Map();
  arr.forEach(function (t) {
    return m.has(t.toString()) || m.set(t.toString(), t);
  });
  return m;
};

var unique = function unique(arr) {
  return Array.from(uniqueMap(arr).values());
};

var eachSlice = function eachSlice(orig, size) {
  var arr = [];

  for (var i = 0, l = orig.length; i < l; i += size) {
    arr.push(orig.slice(i, i + size));
  }

  return arr;
};

var stringPartition = function stringPartition(source, expr) {
  var i = source.indexOf(expr);

  if (i < 0) {
    return [source, "", ""];
  }

  return [source.substring(0, i), expr, source.substring(i + expr.length)];
};

var TokenStream = /*#__PURE__*/function (_Array) {
  _inherits(TokenStream, _Array);

  var _super3 = _createSuper(TokenStream);

  function TokenStream() {
    var _this3;

    var _this2;

    var source1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Exit;

    _classCallCheck(this, TokenStream);

    _this2 = _super3.call(this);
    _this2.error = error;

    if (typeof source1 === "string") {
      source1 = source1.trim().split(/\s+/g);
    }

    if (typeof source1 === "number") {
      source1 = new Array(source1);
    }

    (_this3 = _this2).push.apply(_this3, _toConsumableArray(source1));

    return _this2;
  }

  _createClass(TokenStream, [{
    key: "move",
    value: function move() {
      return this.shift() || null;
    }
  }, {
    key: "next",
    value: function next() {
      this.shift();
      return this;
    }
  }, {
    key: "current",
    value: function current() {
      return this.length > 0 ? this[0] : null;
    }
  }]);

  return TokenStream;
}( /*#__PURE__*/_wrapNativeSuper(Array));

var Pattern = /*#__PURE__*/function () {
  function Pattern() {
    _classCallCheck(this, Pattern);
  }

  _createClass(Pattern, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.constructor.name, "()");
    }
  }, {
    key: "fix",
    value: function fix() {
      this.fixIdentities();
      this.fixRepeatingArguments();
      return this;
    }
  }, {
    key: "fixIdentities",
    value: function fixIdentities(uniq) {
      if (!this.children) {
        return this;
      }

      uniq = uniq || uniqueMap(this.flat());

      for (var i in this.children) {
        if (this.children.hasOwnProperty(i)) {
          var c = this.children[i];

          if (!c.children) {
            if (!uniq.has(c.toString())) {
              throw new Error("Invalid runtime state");
            }

            this.children = this.children || [];
            this.children[i] = uniq.get(c.toString());
          } else {
            c.fixIdentities(uniq);
          }
        }
      }

      return this;
    }
  }, {
    key: "fixRepeatingArguments",
    value: function fixRepeatingArguments() {
      this.either().children.map(function (c) {
        return c.children;
      }).forEach(function (case_) {
        case_ === null || case_ === void 0 ? void 0 : case_.filter(function (c) {
          return c instanceof ChildPattern && case_.filter(function (x) {
            return c.equalTo(x);
          }).length > 1;
        }).forEach(function (e) {
          if (e instanceof Argument || e instanceof Option1 && e.argCount > 0) {
            if (!e.value) {
              e.value = [];
            } else if (typeof e.value === "string") {
              e.value = e.value.split(/\s+/g);
            }
          }

          if (e instanceof Command || e instanceof Option1 && e.argCount === 0) {
            e.value = 0;
          }
        });
      });
      return this;
    }
  }, {
    key: "either",
    value: function either() {
      var ret = [];
      var groups = [[this]];

      while (groups.length > 0) {
        var children = groups.shift();
        var types = children.map(function (child) {
          return child.constructor;
        });

        if (types.includes(Either)) {
          var i = children.findIndex(function (child) {
            return child instanceof Either;
          });
          var either = children[i];
          children.splice(i, 1);

          var _iterator = _createForOfIteratorHelper(either.children),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var c = _step.value;
              groups.push([c].concat(_toConsumableArray(children)));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else if (types.includes(Required)) {
          var _i = children.findIndex(function (child) {
            return child instanceof Required;
          });

          var required = children[_i];
          children.splice(_i, 1);
          groups.push(required.children.concat(children));
        } else if (types.includes(Optional)) {
          var _i2 = children.findIndex(function (child) {
            return child instanceof Optional;
          });

          var optional = children[_i2];
          children.splice(_i2, 1);
          groups.push(optional.children.concat(children));
        } else if (types.includes(AnyOptions)) {
          var _i3 = children.findIndex(function (child) {
            return child instanceof AnyOptions;
          });

          var anyOptions = children[_i3];
          children.splice(_i3, 1);
          groups.push(anyOptions.children.concat(children));
        } else if (types.includes(OneOrMore)) {
          var _i4 = children.findIndex(function (child) {
            return child instanceof OneOrMore;
          });

          var oneOrMore = children[_i4];
          children.splice(_i4, 1);
          groups.push([].concat(_toConsumableArray(oneOrMore.children), _toConsumableArray(oneOrMore.children), _toConsumableArray(children)));
        } else {
          ret.push(children);
        }
      }

      var args = ret.map(function (e) {
        return _construct(Required, _toConsumableArray(e));
      });
      return _construct(Either, _toConsumableArray(args));
    }
  }]);

  return Pattern;
}();

var ChildPattern = /*#__PURE__*/function (_Pattern) {
  _inherits(ChildPattern, _Pattern);

  var _super4 = _createSuper(ChildPattern);

  function ChildPattern(name) {
    var _this4;

    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, ChildPattern);

    _this4 = _super4.call(this);
    _this4.name = name;
    _this4.value = value;
    return _this4;
  }

  _createClass(ChildPattern, [{
    key: "equalTo",
    value: function equalTo(other) {
      return other === this || other.constructor === this.constructor && this.name === other.name && this.value === other.value;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.constructor.name, "(").concat(this.name, ", ").concat(this.value === null ? "" : this.value, ")");
    }
  }, {
    key: "flat",
    value: function flat() {
      for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {
        types[_key] = arguments[_key];
      }

      if (types.length === 0 || types.includes(this.constructor)) {
        return [this];
      }

      return [];
    }
  }, {
    key: "match",
    value: function match(left) {
      var _this5 = this;

      var collected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var _this$singleMatch = this.singleMatch(left),
          _this$singleMatch2 = _slicedToArray(_this$singleMatch, 2),
          pos = _this$singleMatch2[0],
          match = _this$singleMatch2[1];

      if (!match) {
        return [false, left, collected];
      }

      left = [].concat(_toConsumableArray(left.slice(0, pos)), _toConsumableArray(left.slice(pos + 1)));
      var sameName = collected.filter(function (a) {
        return a instanceof ChildPattern && a.name === _this5.name;
      });

      if (this.value instanceof Array || typeof this.value === "number") {
        var increment;

        if (typeof this.value === "number") {
          increment = 1;
        } else {
          increment = typeof match.value === "string" ? [match.value] : match.value;
        }

        if (sameName.length === 0) {
          match.value = increment;
          return [true, left, [].concat(_toConsumableArray(collected), [match])];
        }

        if (increment instanceof Array && sameName[0].value instanceof Array) {
          var _sameName$0$value;

          (_sameName$0$value = sameName[0].value).push.apply(_sameName$0$value, _toConsumableArray(increment));
        } else if (!!increment && typeof sameName[0].value === "number" && typeof increment === "number") {
          sameName[0].value += increment;
        } else {
          throw new Error("Invalid runtime state");
        }

        return [true, left, collected];
      }

      return [true, left, [].concat(_toConsumableArray(collected), [match])];
    }
  }]);

  return ChildPattern;
}(Pattern);

var Option1 = /*#__PURE__*/function (_ChildPattern) {
  _inherits(Option1, _ChildPattern);

  var _super5 = _createSuper(Option1);

  function Option1(_short, _long) {
    var _this6;

    var argCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var value1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Option1);

    _this6 = _super5.call(this, _long || _short, value1);
    _this6["short"] = _short;
    _this6["long"] = _long;
    _this6.argCount = argCount;

    if (![0, 1].includes(argCount)) {
      throw new Error("Invalid runtime state");
    }

    if (value1 === false && argCount > 0) {
      _this6.value = null;
    }

    return _this6;
  }

  _createClass(Option1, [{
    key: "toString",
    value: function toString() {
      return "Option(".concat(this["short"] || "", ", ").concat(this["long"] || "", ", ").concat(this.argCount, ", ").concat(this.value !== null ? this.value : "", ")");
    }
  }, {
    key: "singleMatch",
    value: function singleMatch(left) {
      for (var i = 0; i < left.length; i++) {
        var p = left[i];

        if (p instanceof ChildPattern && this.name === p.name) {
          return [i, p];
        }
      }

      return [-1, null];
    }
  }], [{
    key: "parse",
    value: function parse(optionDescription) {
      var short1 = null;
      var long1 = null;
      var argCount1 = 0;
      var value2 = false;

      var _stringPartition = stringPartition(optionDescription.trim(), "  "),
          _stringPartition2 = _slicedToArray(_stringPartition, 3),
          options = _stringPartition2[0],
          description = _stringPartition2[2];

      options = options.replace(/,/g, " ").replace(/=/g, " ");

      var _iterator2 = _createForOfIteratorHelper(options.trim().split(/\s+/g)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var s = _step2.value;

          if (s.startsWith("--")) {
            long1 = s;
          } else if (s.startsWith("-")) {
            short1 = s;
          } else {
            argCount1 = 1;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (argCount1 > 0) {
        var matched = description.match(/\[default: (.*)\]/i);

        if (matched && matched.length > 1) {
          value2 = matched[1];
        }
      }

      return new Option1(short1, long1, argCount1, value2);
    }
  }]);

  return Option1;
}(ChildPattern);

var Argument = /*#__PURE__*/function (_ChildPattern2) {
  _inherits(Argument, _ChildPattern2);

  var _super6 = _createSuper(Argument);

  function Argument() {
    _classCallCheck(this, Argument);

    return _super6.apply(this, arguments);
  }

  _createClass(Argument, [{
    key: "singleMatch",
    value: function singleMatch(left) {
      for (var i = 0; i < left.length; i++) {
        var p = left[i];

        if (p instanceof Argument) {
          return [i, new Argument(this.name, p.value)];
        }
      }

      return [-1, null];
    }
  }], [{
    key: "parse",
    value: function parse(class_, source) {
      var _source$match;

      var name1 = (_source$match = source.match(/(<\S*?>)/)) === null || _source$match === void 0 ? void 0 : _source$match[0];
      var value2 = source.match(/\[default: (.*)\]/i);
      return new class_(name1, value2 ? value2[0] : null);
    }
  }]);

  return Argument;
}(ChildPattern);

var Command = /*#__PURE__*/function (_Argument) {
  _inherits(Command, _Argument);

  var _super7 = _createSuper(Command);

  function Command(name1) {
    var _this7;

    var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Command);

    _this7 = _super7.call(this, name1, value2);
    _this7.name = name1;
    return _this7;
  }

  _createClass(Command, [{
    key: "singleMatch",
    value: function singleMatch(left) {
      for (var i = 0; i < left.length; i++) {
        var p = left[i];

        if (p instanceof Argument) {
          if (p.value === this.name) {
            return [i, new Command(this.name, true)];
          } else {
            break;
          }
        }
      }

      return [-1, null];
    }
  }]);

  return Command;
}(Argument);

var ParentPattern = /*#__PURE__*/function (_Pattern2) {
  _inherits(ParentPattern, _Pattern2);

  var _super8 = _createSuper(ParentPattern);

  function ParentPattern() {
    var _this8;

    _classCallCheck(this, ParentPattern);

    _this8 = _super8.call(this);

    _defineProperty(_assertThisInitialized(_this8), "children", []);

    for (var _len2 = arguments.length, children = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      children[_key2] = arguments[_key2];
    }

    _this8.children = children;
    return _this8;
  }

  _createClass(ParentPattern, [{
    key: "flat",
    value: function flat() {
      for (var _len3 = arguments.length, types = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        types[_key3] = arguments[_key3];
      }

      if (types.includes(this.constructor)) {
        return [this];
      } else {
        return this.children.map(function (c) {
          return c.flat.apply(c, types);
        }).flat();
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.constructor.name, "(").concat(this.children.map(function (c) {
        return c.toString();
      }).join(", "), ")");
    }
  }]);

  return ParentPattern;
}(Pattern);

var Required = /*#__PURE__*/function (_ParentPattern) {
  _inherits(Required, _ParentPattern);

  var _super9 = _createSuper(Required);

  function Required() {
    _classCallCheck(this, Required);

    return _super9.apply(this, arguments);
  }

  _createClass(Required, [{
    key: "match",
    value: function match(left) {
      var collected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var l = left;
      var c = collected,
          matched = false;

      var _iterator3 = _createForOfIteratorHelper(this.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var p = _step3.value;

          var _p$match = p.match(l, c);

          var _p$match2 = _slicedToArray(_p$match, 3);

          matched = _p$match2[0];
          l = _p$match2[1];
          c = _p$match2[2];

          if (!matched) {
            return [false, left, collected];
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return [true, l, c];
    }
  }]);

  return Required;
}(ParentPattern);

var Optional = /*#__PURE__*/function (_ParentPattern2) {
  _inherits(Optional, _ParentPattern2);

  var _super10 = _createSuper(Optional);

  function Optional() {
    _classCallCheck(this, Optional);

    return _super10.apply(this, arguments);
  }

  _createClass(Optional, [{
    key: "match",
    value: function match(left) {
      var collected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var _iterator4 = _createForOfIteratorHelper(this.children),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var p = _step4.value;

          var _p$match3 = p.match(left, collected);

          var _p$match4 = _slicedToArray(_p$match3, 3);

          left = _p$match4[1];
          collected = _p$match4[2];
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return [true, left, collected];
    }
  }]);

  return Optional;
}(ParentPattern);

var AnyOptions = /*#__PURE__*/function (_Optional) {
  _inherits(AnyOptions, _Optional);

  var _super11 = _createSuper(AnyOptions);

  function AnyOptions() {
    _classCallCheck(this, AnyOptions);

    return _super11.apply(this, arguments);
  }

  return AnyOptions;
}(Optional);

var OneOrMore = /*#__PURE__*/function (_ParentPattern3) {
  _inherits(OneOrMore, _ParentPattern3);

  var _super12 = _createSuper(OneOrMore);

  function OneOrMore() {
    _classCallCheck(this, OneOrMore);

    return _super12.apply(this, arguments);
  }

  _createClass(OneOrMore, [{
    key: "match",
    value: function match(left) {
      var collected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (this.children.length !== 1) {
        throw new Error("Invalid runtime state");
      }

      var l = left,
          c = collected,
          matched = true,
          times = 0;
      var l_ = null;

      while (matched) {
        var _this$children$0$matc = this.children[0].match(l, c);

        var _this$children$0$matc2 = _slicedToArray(_this$children$0$matc, 3);

        matched = _this$children$0$matc2[0];
        l = _this$children$0$matc2[1];
        c = _this$children$0$matc2[2];
        times += matched ? 1 : 0;

        if (l_ === l) {
          break;
        }

        l_ = l;
      }

      if (times >= 1) {
        return [true, l, c];
      }

      return [false, left, collected];
    }
  }]);

  return OneOrMore;
}(ParentPattern);

var Either = /*#__PURE__*/function (_ParentPattern4) {
  _inherits(Either, _ParentPattern4);

  var _super13 = _createSuper(Either);

  function Either() {
    _classCallCheck(this, Either);

    return _super13.apply(this, arguments);
  }

  _createClass(Either, [{
    key: "match",
    value: function match(left) {
      var collected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var outcomes = [];

      var _iterator5 = _createForOfIteratorHelper(this.children),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var p = _step5.value;
          var found = p.match(left, collected);

          if (found[0]) {
            outcomes.push(found);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      var outcomeSize = function outcomeSize(outcome) {
        return outcome[1] === null ? 0 : outcome[1].length;
      };

      if (outcomes.length > 0) {
        return outcomes.sort(function (a, b) {
          return outcomeSize(a) - outcomeSize(b);
        })[0];
      }

      return [false, left, collected];
    }
  }]);

  return Either;
}(ParentPattern);

var parseArgv = function parseArgv(tokens, options) {
  var optionsFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var parsed = [];

  while (tokens.current() !== null) {
    var _tokens$current, _tokens$current2;

    if (tokens.current() === "--") {
      return parsed.concat(tokens.next().map(function (v) {
        return new Argument(null, v);
      }));
    } else if ((_tokens$current = tokens.current()) === null || _tokens$current === void 0 ? void 0 : _tokens$current.startsWith("--")) {
      parsed.push.apply(parsed, _toConsumableArray(parseLong(tokens, options)));
    } else if (((_tokens$current2 = tokens.current()) === null || _tokens$current2 === void 0 ? void 0 : _tokens$current2.startsWith("-")) && tokens.current() !== "-") {
      parsed.push.apply(parsed, _toConsumableArray(parseShorts(tokens, options)));
    } else if (optionsFirst) {
      return parsed.concat(tokens.map(function (v) {
        return new Argument(null, v);
      }));
    } else {
      parsed.push(new Argument(null, tokens.move()));
    }
  }

  return parsed;
};

var parseDefaults = function parseDefaults(doc) {
  var split = doc.split(/^ *(<\S+?>|-\S+?)/mg).slice(1);
  split = eachSlice(split, 2).filter(function (pair) {
    return pair.length === 2;
  }).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        s1 = _ref2[0],
        s2 = _ref2[1];

    return s1 + s2;
  });
  return split.filter(function (s) {
    return s.startsWith("-");
  }).map(function (s) {
    return Option1.parse(s);
  });
};

var parseLong = function parseLong(tokens, options) {
  var long1, eq, value3;

  var _stringPartition3 = stringPartition((tokens === null || tokens === void 0 ? void 0 : tokens.move()) || "", "=");

  var _stringPartition4 = _slicedToArray(_stringPartition3, 3);

  long1 = _stringPartition4[0];
  eq = _stringPartition4[1];
  value3 = _stringPartition4[2];

  if (!long1.startsWith("--")) {
    throw new Error("Invalid runtime state");
  }

  value3 = eq === value3 && eq === "" ? null : value3;
  var similar = options.filter(function (o) {
    return o["long"] && o["long"] === long1;
  });

  if (tokens.error === Exit && similar.length === 0) {
    similar = options.filter(function (o) {
      return o["long"] && o["long"].startsWith(long1);
    });
  }

  var o;

  if (similar.length > 1) {
    var ostr = similar.map(function (o1) {
      return o1["long"];
    }).join(", ");
    throw new tokens.error("".concat(long1, " is not a unique prefix: ").concat(ostr));
  } else if (similar.length === 0) {
    var argCount1 = eq === "=" ? 1 : 0;
    o = new Option1(null, long1, argCount1);
    options.push(o);

    if (tokens.error === Exit) {
      o = new Option1(null, long1, argCount1, argCount1 === 1 ? value3 : true);
    }
  } else {
    var s0 = similar[0];
    o = new Option1(s0["short"], s0["long"], s0.argCount, s0.value);

    if (o.argCount === 0) {
      if (value3 !== null) {
        throw new tokens.error("".concat(o["long"], " must not have an argument"));
      }
    } else {
      if (value3 === null) {
        if (tokens.current() === null) {
          throw new tokens.error("".concat(o["long"], " requires argument"));
        }

        value3 = tokens.move();
      }
    }

    if (tokens.error === Exit) {
      o.value = value3 !== null ? value3 : true;
    }
  }

  return [o];
};

var parseShorts = function parseShorts(tokens, options) {
  var token = tokens.move();

  if (!token || !token.startsWith("-") || token.startsWith("--")) {
    throw new Error("Invalid runtime state");
  }

  var left = token === null || token === void 0 ? void 0 : token.substring(1);
  var parsed = [];

  var _loop = function _loop() {
    var o = void 0;
    var short1 = void 0;
    var _ref3 = ["-" + left[0], left.substring(1)];
    short1 = _ref3[0];
    left = _ref3[1];
    var similar = options.filter(function (o1) {
      return o1["short"] === short1;
    });

    if (similar.length > 1) {
      throw new tokens.error("".concat(short1, " is specified ambiguously ").concat(similar.length, " times"));
    } else if (similar.length === 0) {
      o = new Option1(short1, null, 0);
      options.push(o);

      if (tokens.error === Exit) {
        o = new Option1(short1, null, 0, true);
      }
    } else {
      var s0 = similar[0];
      o = new Option1(short1, s0["long"], s0.argCount, s0.value);
      var value3 = null;

      if (o.argCount !== 0) {
        if (left === "") {
          if (tokens.current() === null) {
            throw new tokens.error("".concat(short1, " requires argument"));
          }

          value3 = tokens.move();
        } else {
          value3 = left;
          left = "";
        }
      }

      if (tokens.error === Exit) {
        o.value = value3 !== null ? value3 : true;
      }
    }

    parsed.push(o);
  };

  while (left && left !== "") {
    _loop();
  }

  return parsed;
};

var parsePattern = function parsePattern(source2, options) {
  var tokens = new TokenStream(source2.replace(/([\[\]\(\)\|]|\.\.\.)/g, " $1 "), DocoptLanguageError);
  var result = parseExpr(tokens, options);

  if (tokens.current() != null) {
    throw new tokens.error("unexpected ending: ".concat(tokens.join(" ")));
  }

  return _construct(Required, _toConsumableArray(result));
};

var parseExpr = function parseExpr(tokens, options) {
  var seq = parseSeq(tokens, options);

  if (tokens.current() !== "|") {
    return seq;
  }

  var result = seq.length > 1 ? [_construct(Required, _toConsumableArray(seq))] : seq;

  while (tokens.current() === "|") {
    tokens.move();
    seq = parseSeq(tokens, options);
    result = result.concat(seq.length > 1 ? [_construct(Required, _toConsumableArray(seq))] : seq);
  }

  return result.length > 1 ? [_construct(Either, _toConsumableArray(result))] : result;
};

var parseSeq = function parseSeq(tokens, options) {
  var result = [];
  var stop = [undefined, null, "]", ")", "|"];

  while (!stop.includes(tokens.current())) {
    var atom = parseAtom(tokens, options);

    if (tokens.current() === "...") {
      atom = [_construct(OneOrMore, _toConsumableArray(atom))];
      tokens.move();
    }

    result.push.apply(result, _toConsumableArray(atom));
  }

  return result;
};

var parseAtom = function parseAtom(tokens, options) {
  var token = tokens.current();
  var matching;
  var pattern;

  if (["(", "["].includes(token)) {
    tokens.move();

    if (token === "(") {
      matching = ")";
      pattern = Required;
    } else {
      matching = "]";
      pattern = Optional;
    }

    var result = _construct(pattern, _toConsumableArray(parseExpr(tokens, options)));

    if (tokens.move() !== matching) {
      throw new tokens.error("unmatched '".concat(token, "'"));
    }

    return [result];
  } else if (token === "options") {
    tokens.move();
    return [new AnyOptions()];
  } else if ((token === null || token === void 0 ? void 0 : token.startsWith("--")) && token !== "--") {
    return parseLong(tokens, options);
  } else if ((token === null || token === void 0 ? void 0 : token.startsWith("-")) && !["-", "--"].includes(token)) {
    return parseShorts(tokens, options);
  } else if ((token === null || token === void 0 ? void 0 : token.startsWith("<")) && token.endsWith(">") || (token === null || token === void 0 ? void 0 : token.toUpperCase()) === token && token.match(/[A-Z]/)) {
    return [new Argument(tokens.move())];
  } else {
    return [new Command(tokens.move())];
  }
};

var VERSION = "1.0.6";
exports.VERSION = VERSION;
var defaultParams = Object.freeze({
  help: true,
  optionsFirst: false
});

var docopt = function docopt(doc) {
  var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var params = _objectSpread(_objectSpread({}, defaultParams), init);

  params.argv = params.argv || processArgv();
  Exit.usage = printableUsage(doc);
  var options = parseDefaults(doc);
  var pattern = parsePattern(formalUsage(Exit.usage || ""), options);
  var argv = parseArgv(new TokenStream(params.argv, Exit), options, params.optionsFirst);
  var patternOptions = uniqueMap(pattern.flat(Option1));
  pattern.flat(AnyOptions).forEach(function (ao) {
    var docOptions = parseDefaults(doc);
    ao.children = unique(docOptions.filter(function (o) {
      return !patternOptions.has(o.toString());
    }));
  });
  extras(params.help, params.version, argv.filter(function (x) {
    return x instanceof Option1;
  }), doc);

  var _pattern$fix$match = pattern.fix().match(argv),
      _pattern$fix$match2 = _slicedToArray(_pattern$fix$match, 3),
      matched = _pattern$fix$match2[0],
      left = _pattern$fix$match2[1],
      collected = _pattern$fix$match2[2];

  collected = collected || [];

  if (matched && left && left.length === 0) {
    return Object.fromEntries(pattern.flat().concat(collected).map(function (a) {
      return [a.name, a.value];
    }));
  }

  throw new Exit();
};

var _default = docopt;
exports["default"] = _default;

var extras = function extras(help, version, options, doc) {
  if (help && options.filter(function (o) {
    return ["-h", "--help"].includes(o.name);
  }).length > 0) {
    Exit.usage = undefined;
    throw new Exit(doc.trim());
  }

  if (version && options.filter(function (o) {
    return o.name === "--version" && o.value;
  }).length > 0) {
    Exit.usage = undefined;
    throw new Exit(version);
  }
};

var printableUsage = function printableUsage(doc) {
  var usageSplit = doc.split(/([Uu][Ss][Aa][Gg][Ee]:)/);

  if (usageSplit.length < 3) {
    throw new DocoptLanguageError('\"usage:\" (case-insensitive) not found.');
  }

  if (usageSplit.length > 3) {
    throw new DocoptLanguageError('More than one \"usage:\" (case-insensitive).');
  }

  return usageSplit.slice(1).join("").split(/\n\s*\n/)[0].trim();
};

var formalUsage = function formalUsage(printableUsage1) {
  var pu = printableUsage1.split(/\s+/g).slice(1);
  var ret = [];

  var _iterator6 = _createForOfIteratorHelper(pu.slice(1)),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var s = _step6.value;

      if (s === pu[0]) {
        ret.push(") | (");
      } else {
        ret.push(s);
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  return "( ".concat(ret.join(" "), " )");
};
