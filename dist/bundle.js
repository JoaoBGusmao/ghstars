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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apiWorker = __webpack_require__(1);

var _apiWorker2 = _interopRequireDefault(_apiWorker);

var _repoCard = __webpack_require__(2);

var _repoCard2 = _interopRequireDefault(_repoCard);

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.api = new _apiWorker2.default();
		this.cards = new _repoCard2.default(this);

		this.state = {
			loading: false,
			filter: 'JavaScript',
			ghuser: 'wilfernandesjr',
			sort: 'sortStarsDescending'
		};

		this.cards.startLoading();

		this.makeGHCall();
	}

	_createClass(App, [{
		key: 'makeGHCall',
		value: function makeGHCall() {
			this.api.api('https://api.github.com').toRoute('users/' + this.state.ghuser + '/starred').whenDone(this.dataReceived.bind(this)).make();
		}
	}, {
		key: 'dataReceived',
		value: function dataReceived(data) {
			this.cards.showCards(data);
		}
	}, {
		key: 'setState',
		value: function setState(state) {
			this.state = state;
		}
	}]);

	return App;
}();

new App();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiWorker = function () {
	function ApiWorker() {
		_classCallCheck(this, ApiWorker);

		this.baseUrl = '';
		this.route = '';
		this.cb = function () {};
	}

	_createClass(ApiWorker, [{
		key: 'createCall',
		value: function createCall() {
			return this;
		}
	}, {
		key: 'api',
		value: function api(baseUrl) {
			this.baseUrl = baseUrl;
			return this;
		}
	}, {
		key: 'toRoute',
		value: function toRoute(route) {
			this.route = route;
			return this;
		}
	}, {
		key: 'getApiUrl',
		value: function getApiUrl() {
			return this.baseUrl + '/' + this.route;
		}
	}, {
		key: 'make',
		value: function make() {
			if (!this.checkForFields()) return;

			var xhttp = new XMLHttpRequest();
			var classContext = this;
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					classContext.complete(this.responseText, classContext.cb);
				}
			};
			xhttp.open('GET', this.getApiUrl(), true);
			xhttp.send();
		}
	}, {
		key: 'whenDone',
		value: function whenDone(cb) {
			this.cb = cb;
			return this;
		}
	}, {
		key: 'checkForFields',
		value: function checkForFields() {
			try {
				if (this.baseUrl == '') throw 'baseUrl não foi fornecido para a chamada';
				if (this.route == '') throw 'route não foi fornecido para a chamada';
			} catch (e) {
				console.log('ApiWorker Error: ' + e);
				return false;
			}
			return true;
		}
	}, {
		key: 'complete',
		value: function complete(data, cb) {
			return cb(data);
		}
	}]);

	return ApiWorker;
}();

exports.default = ApiWorker;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templating = __webpack_require__(5);

var _templating2 = _interopRequireDefault(_templating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RepoCard = function () {
	function RepoCard(app) {
		_classCallCheck(this, RepoCard);

		this.app = app;
		this.template = new _templating2.default();
	}

	_createClass(RepoCard, [{
		key: 'startLoading',
		value: function startLoading() {
			this.app.setState(_extends({}, this.app.state, {
				loading: true
			}));
			document.querySelector('.loading').classList.add('active');
		}
	}, {
		key: 'stopLoading',
		value: function stopLoading() {
			this.app.setState(_extends({}, this.app.state, {
				loading: false
			}));
			document.querySelector('.loading').classList.remove('active');
		}
	}, {
		key: 'showCards',
		value: function showCards(response, done) {
			var _this = this;

			var ghStars = JSON.parse(response);

			ghStars.sort(function (a, b) {
				return _this.sortStarsDescending(a, b);
			});

			ghStars.map(function (item, index) {
				if (_this.fitInFilter(item)) _this.renderCard(item);
			});

			this.stopLoading();
		}
	}, {
		key: 'renderCard',
		value: function renderCard(item) {
			if (this.template.getTemplate() == null) {
				this.template.setTemplate(this.template.getHtmlTemplateFromDOM());
			}

			var render = this.template.getTemplate();

			render = this.template.variablesReplace([{ prop: 'name', to: item.name }, { prop: 'html_url', to: item.html_url }, { prop: 'stargazers_count', to: item.stargazers_count.toLocaleString() }, { prop: 'description', to: item.description || 'Sem descrição' }, { prop: 'owner.login', to: item.owner.login }, { prop: 'open_issues_count', to: item.open_issues_count }, { prop: 'created_at', to: item.created_at }, { prop: 'updated_at', to: item.updated_at }, { prop: 'language', to: item.language }], render);

			render = this.fixImageSrc(render);

			this.template.appendHTML('.repo-list', render);
		}
	}, {
		key: 'fitInFilter',
		value: function fitInFilter(item) {
			var fit = item.language === this.app.state.filter;

			return fit;
		}
	}, {
		key: 'fixImageSrc',
		value: function fixImageSrc(res) {
			var fixed = res.replace('data-img-src', 'src');

			return fixed;
		}
	}, {
		key: 'sortStarsDescending',
		value: function sortStarsDescending(a, b) {
			return parseInt(b.stargazers_count) - parseInt(a.stargazers_count);
		}
	}, {
		key: 'sortStarsAscending',
		value: function sortStarsAscending(a, b) {
			return parseInt(a.stargazers_count) - parseInt(b.stargazers_count);
		}
	}, {
		key: 'sortIssuesDescending',
		value: function sortIssuesDescending(a, b) {
			return parseInt(b.open_issues_count) - parseInt(a.open_issues_count);
		}
	}, {
		key: 'sortIssuesAscending',
		value: function sortIssuesAscending(a, b) {
			return parseInt(a.open_issues_count) - parseInt(b.open_issues_count);
		}
	}, {
		key: 'sortName',
		value: function sortName(a, b) {
			if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
			if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
			return 0;
		}
	}]);

	return RepoCard;
}();

exports.default = RepoCard;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Templating = function () {
	function Templating() {
		_classCallCheck(this, Templating);

		this.template = null;
	}

	_createClass(Templating, [{
		key: 'getTemplate',
		value: function getTemplate() {
			var template = this.template;

			return template;
		}
	}, {
		key: 'setTemplate',
		value: function setTemplate(template) {
			this.template = template;
		}
	}, {
		key: 'variablesReplace',
		value: function variablesReplace(toReplace, render) {
			var res = render;

			toReplace.forEach(function (item, index) {
				return res = res.replace('{' + item.prop + '}', item.to);
			});

			return res;
		}
	}, {
		key: 'appendHTML',
		value: function appendHTML(selector, render) {
			var temp = document.createElement('div');
			temp.innerHTML = render;
			var htmlObject = temp.firstChild;

			htmlObject.classList.add('active');

			document.querySelector(selector).appendChild(htmlObject);
		}
	}, {
		key: 'getHtmlTemplateFromDOM',
		value: function getHtmlTemplateFromDOM() {
			var tpl = document.querySelector('.repo-list .card-repo').outerHTML;
			document.querySelector('.repo-list').innerHTML = '';

			return tpl;
		}
	}]);

	return Templating;
}();

exports.default = Templating;

/***/ })
/******/ ]);