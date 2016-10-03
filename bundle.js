/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	chrome.storage.sync.get({
	  url: "",
	  alert: "Totem detects a watched URL!"
	}, function(items) {
	  console.log("Running")
	  var pattern = __webpack_require__(1)
	  var urlRegex = pattern.parse(items.url)
	  if (urlRegex.test(document.URL)) {
	    alert(items.alert)
	  }
	})


/***/ },
/* 1 */
/***/ function(module, exports) {

	// Reference: https://developer.chrome.com/extensions/match_patterns
	var scheme = "(\\*|http|https|file|ftp)";
	var host = "(\\*|(?:\\*\\.)?(?:[^/*]+))?";
	var path = "(.*)";
	var regex = new RegExp(
	  "^"
	  + scheme
	  + "://"
	  + host
	  + "/"
	  + path
	  + "$"
	);

	function parse(pattern) {
	  var match = regex.exec(pattern);
	  if (!match) return null;

	  var scheme = match[1];
	  var host = match[2];
	  var path = match[3];

	  if (!host && scheme !== 'file') return null;

	  return makeRegExp(scheme, host, path);
	}

	function makeRegExp(scheme, host, path) {
	  var regex = '^';
	  if (scheme === '*') {
	    regex += '(http|https)';
	  } else {
	    regex += scheme;
	  }

	  regex += "://";

	  if (host) {
	    if (host === '*') {
	      regex += '[^/]+?';
	    } else {
	      if (host.match(/^\*\./)) {
	        regex += '[^/]*?';
	        host = host.substring(2);
	      }
	      regex += host.replace(/\./g, '\\.');
	    }
	  }

	  if (path) {
	    if (path === '*') {
	      regex += '(/.*)?'
	    } else if (path[0] !== '/') {
	      regex += '/';
	      regex += path.replace(/\*/g, '.*?');
	      regex += '/?';
	    }
	  }

	  regex += '$';
	  return new RegExp(regex);
	}

	function allUrls() {
	  return /(http|https|file|ftp):\/\/.+/;
	}

	module.exports = {
	  parse: parse,
	  allUrls: allUrls,
	}


/***/ }
/******/ ]);