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


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apiWorker = __webpack_require__(1);

var _apiWorker2 = _interopRequireDefault(_apiWorker);

var _repoCard = __webpack_require__(2);

var _repoCard2 = _interopRequireDefault(_repoCard);

var _ghemojis = __webpack_require__(6);

var _ghemojis2 = _interopRequireDefault(_ghemojis);

__webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.api = new _apiWorker2.default();
		this.cards = new _repoCard2.default(this);

		var ghuser = this.getUserFromUrl();

		if (!ghuser) {
			ghuser = 'wilfernandesjr';
		}

		this.state = {
			loading: false,
			filter: 'Todas as Linguagens',
			ghuser: ghuser,
			sort: 'sortStarsDescending',
			searching: false
		};

		this.reloadCards(true);
		this.addEventListeners();
	}

	_createClass(App, [{
		key: 'getUserFromUrl',
		value: function getUserFromUrl() {
			return this.get('ghuser');
		}
	}, {
		key: 'reloadCards',
		value: function reloadCards(callApiAgain) {
			if (callApiAgain) {
				this.cards.setData(null);
			}

			this.setGHUserToDOM();
			this.startLoading();
			this.makeGHCall();
		}
	}, {
		key: 'setGHUserToDOM',
		value: function setGHUserToDOM() {
			document.getElementById('ghuser').innerHTML = this.state.ghuser;
		}
	}, {
		key: 'addEventListeners',
		value: function addEventListeners() {
			document.querySelector('.order-select').addEventListener('change', this.orderChanged.bind(this));
			document.querySelector('.filter-select').addEventListener('change', this.filterChanged.bind(this));
			document.getElementById('change-ghuser').addEventListener('click', this.toggleGHUserChange.bind(this));
			document.querySelector('.ghuser-button').addEventListener('click', this.GHUserChange.bind(this));
		}
	}, {
		key: 'orderChanged',
		value: function orderChanged(e) {
			this.setState(_extends({}, this.state, {
				sort: e.target.value
			}));

			this.reloadCards(false);
		}
	}, {
		key: 'filterChanged',
		value: function filterChanged(e) {
			var filter = e.target.value;
			if (this.cards.validateFilter(filter)) {
				this.setState(_extends({}, this.state, {
					filter: filter
				}));
				return this.reloadCards(false);
			}
			console.error('Você forneceu um filtro inválido!');
		}
	}, {
		key: 'toggleGHUserChange',
		value: function toggleGHUserChange(e) {
			if (e) e.preventDefault();

			var ghUserClasses = document.querySelector('.new-ghuser').classList;
			var changeUser = document.getElementById('change-ghuser');

			if (ghUserClasses.contains('active')) {
				this.setState(_extends({}, this.state, {
					searching: false
				}));

				changeUser.innerHTML = changeUser.dataset.default;

				return ghUserClasses.remove('active');
			}
			this.setState(_extends({}, this.state, {
				searching: true
			}));

			changeUser.innerHTML = changeUser.dataset.close;

			return ghUserClasses.add('active');
		}
	}, {
		key: 'GHUserChange',
		value: function GHUserChange() {
			var newGhUser = document.querySelector('.ghuser-input').value;

			this.setState(_extends({}, this.state, {
				ghuser: newGhUser,
				filter: 'Todas as Linguagens'
			}));

			var pageUrl = '?ghuser=' + newGhUser;
			window.history.pushState('', '', pageUrl);

			this.cards.clearCards();

			return this.reloadCards(true);
		}
	}, {
		key: 'makeGHCall',
		value: function makeGHCall() {
			this.hideErrors();
			if (this.cards.data != null) {
				return this.dataReceived();
			}
			this.api.api('https://api.github.com').toRoute('users/' + this.state.ghuser + '/starred').whenDone(this.dataReceived.bind(this)).throw(this.apiError.bind(this)).make();
		}
	}, {
		key: 'dataReceived',
		value: function dataReceived(data) {
			if (this.cards.data == null) {
				this.cards.setData(data);
			}
			this.cards.showCards();
			if (this.state.searching) {
				this.toggleGHUserChange(null);
			}
		}
	}, {
		key: 'apiError',
		value: function apiError(status) {
			var error = "Ocorreu um erro desconhecido ao solicitar a API do Github";

			if (status == 403) {
				error = "Você não tem permissão para acessar a API";
			}

			if (status == 404) {
				error = "O usuário não foi encontrado";
			}
			this.stopLoading();
			this.showError(error);
		}
	}, {
		key: 'setState',
		value: function setState(state) {
			this.state = state;
		}
	}, {
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
		key: 'showError',
		value: function showError(error) {
			var errorWrapper = document.getElementById('error-wrapper');
			errorWrapper.classList.add('active');
			errorWrapper.innerHTML = error;
			document.querySelector('.main-content').classList.add('has-error');
		}
	}, {
		key: 'hideErrors',
		value: function hideErrors() {
			var errorWrapper = document.getElementById('error-wrapper');
			errorWrapper.classList.remove('active');
			errorWrapper.innerHTML = '';
			document.querySelector('.main-content').classList.remove('has-error');
		}
	}, {
		key: 'get',
		value: function get(name) {
			if (name = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)').exec(location.search)) return decodeURIComponent(name[1]);
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
					return classContext.complete(this.responseText, classContext.cb);
				}
				if (this.readyState == 4) {
					return classContext.throwComplete(this.status, classContext.errorCb);
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
		key: 'throw',
		value: function _throw(cb) {
			this.errorCb = cb;
			return this;
		}
	}, {
		key: 'throwComplete',
		value: function throwComplete(status, cb) {
			return cb(status);
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templating = __webpack_require__(3);

var _templating2 = _interopRequireDefault(_templating);

var _ghemojis = __webpack_require__(6);

var _ghemojis2 = _interopRequireDefault(_ghemojis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RepoCard = function () {
	function RepoCard(app) {
		_classCallCheck(this, RepoCard);

		this.app = app;
		this.data = null;
		this.template = new _templating2.default();
		this.filters = [];
		this.filterTemplate = new _templating2.default();
		this.ghemojis = new _ghemojis2.default();
	}

	_createClass(RepoCard, [{
		key: 'showCards',
		value: function showCards() {
			var _this = this;

			if (this.template.getTemplate() != null) {
				this.template.wrapper.innerHTML = '';
			}

			var ghStars = JSON.parse(this.data);

			if (ghStars.length == 0) {
				this.app.showError('Nenhum repositório com star encontrado para o usuário');
			}

			this.loadLanguagesFilter(ghStars);

			ghStars.sort(function (a, b) {
				return _this.sortCards(a, b, _this.app.state.sort);
			});

			ghStars.map(function (item, index) {
				if (_this.fitInFilter(item)) _this.renderCard(item);
			});

			this.app.stopLoading();
		}
	}, {
		key: 'sortCards',
		value: function sortCards(a, b, sort) {
			switch (sort) {
				case 'sortName':
					if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
					if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
					return 0;
				case 'sortStarsAscending':
					return parseInt(a.stargazers_count) - parseInt(b.stargazers_count);
				case 'sortIssuesDescending':
					return parseInt(b.open_issues_count) - parseInt(a.open_issues_count);
				case 'sortIssuesAscending':
					return parseInt(a.open_issues_count) - parseInt(b.open_issues_count);
				case 'sortStarsDescending':
				default:
					return parseInt(b.stargazers_count) - parseInt(a.stargazers_count);
			}
		}
	}, {
		key: 'validateFilter',
		value: function validateFilter(filter) {
			if (this.filters.indexOf(filter) != -1) {
				return true;
			}
			return false;
		}
	}, {
		key: 'renderCard',
		value: function renderCard(item) {
			if (this.template.getTemplate() == null) {
				this.template.setTemplate(this.template.getHtmlTemplateFromDOM('.repo-list .card-repo'));
			}

			var render = this.template.getTemplate();
			var output = this.modifyCardToRender(render, item);

			this.template.appendHTML(output);
		}
	}, {
		key: 'modifyCardToRender',
		value: function modifyCardToRender(render, item) {
			var render = this.template.variablesReplace([{ prop: 'name', to: item.name }, { prop: 'html_url', to: item.html_url }, { prop: 'stargazers_count', to: item.stargazers_count.toLocaleString() }, { prop: 'description', to: this.ghemojis.replace(item.description) || 'Sem descrição' }, { prop: 'owner.login', to: item.owner.login }, { prop: 'open_issues_count', to: item.open_issues_count }, { prop: 'created_at', to: this.formatDate(item.created_at) }, { prop: 'updated_at', to: this.formatDate(item.updated_at) }, { prop: 'language', to: item.language || 'Sem Linguagem' }], render);

			render = this.fixImageSrc(render);

			return render;
		}
	}, {
		key: 'fitInFilter',
		value: function fitInFilter(item) {
			var fit = item.language === this.app.state.filter || this.app.state.filter === 'Todas as Linguagens';

			return fit;
		}
	}, {
		key: 'fixImageSrc',
		value: function fixImageSrc(res) {
			var fixed = res.replace('data-img-src', 'src');

			return fixed;
		}
	}, {
		key: 'loadLanguagesFilter',
		value: function loadLanguagesFilter(repos) {
			var _this2 = this;

			if (repos != null) {
				repos.forEach(function (item) {
					if (item.language != null && _this2.filters.indexOf(item.language) == -1) {
						_this2.filters.push(item.language);
					}
				});

				this.filters.sort();

				this.filters.unshift('Todas as Linguagens');

				this.putFiltersToSelect();
			}
		}
	}, {
		key: 'putFiltersToSelect',
		value: function putFiltersToSelect() {
			var _this3 = this;

			if (this.filterTemplate.getTemplate() == null) {
				this.filterTemplate.setTemplate(this.filterTemplate.getHtmlTemplateFromDOM('.filter-select option'));
			}

			this.filters.forEach(function (item, index) {
				if (document.querySelector('option[value="' + item + '"]') != null) {
					return;
				}

				var render = _this3.filterTemplate.getTemplate();
				render = _this3.template.variablesReplace([{ prop: 'language', to: item || 'Sem Linguagem' }], render);

				_this3.filterTemplate.appendHTML(render);
			});
		}
	}, {
		key: 'setData',
		value: function setData(data) {
			this.data = data;
		}
	}, {
		key: 'clearCards',
		value: function clearCards() {
			this.setData(null);
			if (this.filterTemplate.wrapper) {
				this.filterTemplate.wrapper.innerHTML = '';
			}
			this.filters = [];
		}
	}, {
		key: 'formatDate',
		value: function formatDate(date) {
			var timestamp = Date.parse(date);
			var date = new Date(timestamp);
			var day = date.getDate();
			var month = ("0" + (date.getMonth() + 1)).slice(-2);
			var year = date.getFullYear();

			return day + '/' + month + '/' + year;
		}
	}]);

	return RepoCard;
}();

exports.default = RepoCard;

/***/ }),
/* 3 */
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
		this.wrapper = null;
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
			var _this = this;

			var res = render;

			toReplace.forEach(function (item, index) {
				return res = _this.replaceAll(res, '{' + item.prop + '}', item.to);
			});

			return res;
		}
	}, {
		key: 'appendHTML',
		value: function appendHTML(render) {
			var temp = document.createElement('div');
			temp.innerHTML = render;
			var htmlObject = temp.firstChild;

			htmlObject.classList.add('active');

			this.wrapper.appendChild(htmlObject);
		}
	}, {
		key: 'getHtmlTemplateFromDOM',
		value: function getHtmlTemplateFromDOM(selector) {
			var tpl = document.querySelector(selector);
			var html = tpl.outerHTML;

			this.wrapper = tpl.parentNode;
			this.wrapper.innerHTML = '';

			return html;
		}
	}, {
		key: 'replaceAll',
		value: function replaceAll(str, find, replace) {
			return str.replace(new RegExp(find, 'g'), replace);
		}
	}]);

	return Templating;
}();

exports.default = Templating;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apiWorker = __webpack_require__(1);

var _apiWorker2 = _interopRequireDefault(_apiWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ghemojis = function () {
	function Ghemojis() {
		_classCallCheck(this, Ghemojis);

		this.api = new _apiWorker2.default();
		this.cacheName = 'ghemojis';
		this.emojiLib = this.getEmojiLib();
	}

	_createClass(Ghemojis, [{
		key: 'getEmojiLib',
		value: function getEmojiLib() {
			return this.getFromLocal() || this.getFromApi();
		}
	}, {
		key: 'getFromLocal',
		value: function getFromLocal() {
			try {
				var storage = JSON.parse(localStorage.getItem(this.cacheName));
				this.replaceBody();
				return storage;
			} catch (e) {
				return null;
			}

			return null;
		}
	}, {
		key: 'getFromApi',
		value: function getFromApi() {
			return this.api.api('https://api.github.com').toRoute('emojis').whenDone(this.saveCache.bind(this)).throw(this.apiError.bind(this)).make();
		}
	}, {
		key: 'saveCache',
		value: function saveCache(data) {
			this.emojiLib = JSON.parse(data);
			localStorage.setItem(this.cacheName, data);
			this.replaceBody();
		}
	}, {
		key: 'apiError',
		value: function apiError() {
			console.log("Não fo possível obter os emojis da API");
		}
	}, {
		key: 'replaceBody',
		value: function replaceBody() {
			var body = document.querySelector('body').innerHTML;
			body = this.replace(body);
			document.querySelector('body').innerHTML = body;
		}
	}, {
		key: 'replace',
		value: function replace(text) {
			var _this = this;

			if (text == null) {
				return null;
			}

			text = text.replace(new RegExp('\\:(.\\S*?)\\:', 'g'), function (match, contents, s, offset) {
				return _this.getEmojiImg(contents);
			});

			return text;
		}
	}, {
		key: 'getEmojiImg',
		value: function getEmojiImg(emoji) {
			if (this.emojiLib[emoji]) {
				return this.getEmojiCode(this.emojiLib[emoji], emoji);
			}
			return null;
		}
	}, {
		key: 'getEmojiCode',
		value: function getEmojiCode(img, name) {
			return '<img class=\'gh-emoji\' src="' + img + '" alt=":' + name + ':" />';
		}
	}]);

	return Ghemojis;
}();

exports.default = Ghemojis;

/***/ })
/******/ ]);