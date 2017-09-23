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


var _apiWorker = __webpack_require__(1);

var _apiWorker2 = _interopRequireDefault(_apiWorker);

var _repoCard = __webpack_require__(2);

var _repoCard2 = _interopRequireDefault(_repoCard);

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cards = null;

var init = function init() {
	var user = 'wilfernandesjr';
	var worker = new _apiWorker2.default();
	cards = new _repoCard2.default();

	cards.startLoading();

	worker.api('https://api.github.com').toRoute('users/' + user + '/starred').whenDone(dataReceived).make();
};

var dataReceived = function dataReceived(data) {
	cards.showCards(data);
};

init();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RepoCard = function () {
	function RepoCard() {
		_classCallCheck(this, RepoCard);

		this.state = {
			loading: false,
			filter: 'JavaScript'
		};

		this.template = null;
	}

	_createClass(RepoCard, [{
		key: 'startLoading',
		value: function startLoading() {
			this.setState(_extends({}, this.state, {
				loading: true
			}));
			document.querySelector('.loading').classList.add('active');
		}
	}, {
		key: 'stopLoading',
		value: function stopLoading() {
			this.setState(_extends({}, this.state, {
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
			if (this.template == null) {
				this.template = this.getTemplate();
			}

			var render = this.template;
			render = this.prepareToRender(render, item);

			var temp = document.createElement('div');
			temp.innerHTML = render;
			var htmlObject = temp.firstChild;
			htmlObject.classList.add('active');

			document.querySelector('.repo-list').appendChild(htmlObject);
		}
	}, {
		key: 'prepareToRender',
		value: function prepareToRender(render, item) {
			var res = render;

			res = res.replace('{name}', item.name);
			res = res.replace('{html_url}', item.html_url);
			res = res.replace('{stargazers_count}', item.stargazers_count.toLocaleString());
			res = res.replace('{description}', item.description || 'Sem descrição');
			res = res.replace('{owner.login}', item.owner.login);
			res = res.replace('{open_issues_count}', item.open_issues_count);
			res = res.replace('{created_at}', item.created_at);
			res = res.replace('{updated_at}', item.updated_at);
			res = res.replace('{language}', item.language);

			res = this.fixImageSrc(res);

			return res;
		}
	}, {
		key: 'fitInFilter',
		value: function fitInFilter(item) {
			var fit = item.language === this.state.filter;

			return fit;
		}
	}, {
		key: 'getTemplate',
		value: function getTemplate() {
			var tpl = document.querySelector('.repo-list .card-repo').outerHTML;
			document.querySelector('.repo-list').innerHTML = '';

			return tpl;
		}
	}, {
		key: 'fixImageSrc',
		value: function fixImageSrc(res) {
			var fixed = res.replace('data-img-src', 'src');

			return fixed;
		}
	}, {
		key: 'setState',
		value: function setState(state) {
			this.state = state;
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

/***/ })
/******/ ]);