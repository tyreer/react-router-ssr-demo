/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Home = __webpack_require__(10);

var _Home2 = _interopRequireDefault(_Home);

var _Grid = __webpack_require__(11);

var _Grid2 = _interopRequireDefault(_Grid);

var _api = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: "/",
  exact: true,
  component: _Home2.default
}, {
  path: "/popular/:id",
  component: _Grid2.default,
  fetchInitialData: function fetchInitialData() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return (0, _api.fetchPopularRepos)(path.split("/").pop());
  }
}];

exports.default = routes;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPopularRepos = fetchPopularRepos;

var _isomorphicFetch = __webpack_require__(12);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchPopularRepos() {
  var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "all";

  var encodedURI = encodeURI("https://api.github.com/search/repositories?q=stars:>1+language:" + language + "&sort=stars&order=desc&type=Repositories");

  return (0, _isomorphicFetch2.default)(encodedURI).then(function (data) {
    return data.json();
  }).then(function (repos) {
    return repos.items;
  }).catch(function (error) {
    console.warn(error);
    return null;
  });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(5);

var _express2 = _interopRequireDefault(_express);

var _cors = __webpack_require__(6);

var _cors2 = _interopRequireDefault(_cors);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(7);

var _reactRouterDom = __webpack_require__(1);

var _serializeJavascript = __webpack_require__(8);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _App = __webpack_require__(9);

var _App2 = _interopRequireDefault(_App);

var _routes = __webpack_require__(2);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// import { fetchPopularRepos } from "../shared/api";


app.use((0, _cors2.default)());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(_express2.default.static("public"));

app.get("*", function (req, res, next) {
  var activeRoute = _routes2.default.find(function (route) {
    return (0, _reactRouterDom.matchPath)(req.url, route);
  }) || {};

  var promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve();

  promise.then(function (data) {
    var context = { data: data };
    var markup = (0, _server.renderToString)(_react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(_App2.default, null)
    ));

    res.send("\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <title>SSR with RR</title>\n            <script src=\"/bundle.js\" defer></script>\n            <script>window.__INITIAL_DATA__ = " + (0, _serializeJavascript2.default)(data) + "</script>\n          </head>\n\n          <body>\n            <div id=\"app\">" + markup + "</div>\n          </body>\n        </html>\n      ");
  }).catch(next);
});

app.listen(3000, function () {
  console.log("Server is listening on port: 3000");
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _routes = __webpack_require__(2);

var _routes2 = _interopRequireDefault(_routes);

var _reactRouterDom = __webpack_require__(1);

var _Navbar = __webpack_require__(13);

var _Navbar2 = _interopRequireDefault(_Navbar);

var _NoMatch = __webpack_require__(14);

var _NoMatch2 = _interopRequireDefault(_NoMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_Navbar2.default, null),
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _routes2.default.map(function (_ref) {
            var path = _ref.path,
                exact = _ref.exact,
                C = _ref.component,
                rest = _objectWithoutProperties(_ref, ["path", "exact", "component"]);

            return _react2.default.createElement(_reactRouterDom.Route, {
              key: path,
              path: path,
              exact: exact,
              render: function render(props) {
                return _react2.default.createElement(C, _extends({}, props, rest));
              }
            });
          }),
          _react2.default.createElement(_reactRouterDom.Route, { render: function render(props) {
              return _react2.default.createElement(_NoMatch2.default, props);
            } })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Home;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Home() {
  return _react2.default.createElement(
    "div",
    null,
    "Select a Language"
  );
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _api = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

    var repos = void 0;
    if (false) {
      repos = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      repos = props.staticContext.data;
    }

    _this.state = {
      repos: repos,
      loading: repos ? false : true
    };

    _this.fetchRepos = _this.fetchRepos.bind(_this);
    return _this;
  }

  _createClass(Grid, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.state.repos) {
        this.fetchRepos(this.props.match.params.id);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.match.params.id !== this.props.match.params.id) {
        this.fetchRepos(this.props.match.params.id);
      }
    }
  }, {
    key: "fetchRepos",
    value: function fetchRepos(lang) {
      var _this2 = this;

      this.setState(function () {
        return {
          loading: true
        };
      });

      this.props.fetchInitialData(lang).then(function (repos) {
        return _this2.setState(function () {
          return {
            repos: repos,
            loading: false
          };
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          repos = _state.repos,
          loading = _state.loading;


      if (loading === true) {
        return _react2.default.createElement(
          "p",
          null,
          "LOADING"
        );
      }

      return _react2.default.createElement(
        "ul",
        { style: { display: "flex", flexWrap: "wrap" } },
        repos.map(function (_ref) {
          var name = _ref.name,
              owner = _ref.owner,
              stargazers_count = _ref.stargazers_count,
              html_url = _ref.html_url;
          return _react2.default.createElement(
            "li",
            { key: name, style: { margin: 30 } },
            _react2.default.createElement(
              "ul",
              null,
              _react2.default.createElement(
                "li",
                null,
                _react2.default.createElement(
                  "a",
                  { href: html_url },
                  name
                )
              ),
              _react2.default.createElement(
                "li",
                null,
                "@",
                owner.login
              ),
              _react2.default.createElement(
                "li",
                null,
                stargazers_count,
                " stars"
              )
            )
          );
        })
      );
    }
  }]);

  return Grid;
}(_react.Component);

exports.default = Grid;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Navbar;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Navbar() {
  var languages = [{
    name: "All",
    param: "all"
  }, {
    name: "JavaScript",
    param: "javascript"
  }, {
    name: "Ruby",
    param: "ruby"
  }, {
    name: "Python",
    param: "python"
  }, {
    name: "Java",
    param: "java"
  }];

  return _react2.default.createElement(
    "ul",
    null,
    languages.map(function (_ref) {
      var name = _ref.name,
          param = _ref.param;
      return _react2.default.createElement(
        "li",
        { key: param },
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          {
            activeStyle: { fontWeight: "bold" },
            to: "/popular/" + param
          },
          name
        )
      );
    })
  );
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NoMatch;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoMatch() {
  return _react2.default.createElement(
    "div",
    null,
    "Four Oh Four"
  );
}

/***/ })
/******/ ]);