(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ghfs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var base = "https://api.github.com";

function get(url) {
	var cb = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

	if (window.$ && window.$.getJSON) {
		$.get(url, cb);
	} else if (fetch) {
		fetch(url).then(function (res) {
			return res.text();
		}).then(function (json) {
			return cb(null, json);
		}).catch(function (err) {
			return cb(err);
		});
	} else {
		throw new Error("No ajax wrapper found");
	}
}

function getJSON(url) {
	var cb = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

	get(url, function (err, res) {
		if (err) return cb(err);
		cb(null, JSON.parse(res));
	});
}

var ghfs = function () {
	function ghfs(repo) {
		var ref = arguments.length <= 1 || arguments[1] === undefined ? "master" : arguments[1];

		_classCallCheck(this, ghfs);

		this.repo = repo;
		this.ref = ref;
	}

	_createClass(ghfs, [{
		key: "contents",
		value: function contents() {
			var path = arguments.length <= 0 || arguments[0] === undefined ? "/" : arguments[0];
			var cb = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

			getJSON(base + "/repos/" + this.repo + "/contents" + path + "?ref=" + this.ref, function (err, files) {
				if (err) return cb(err);
				cb(null, files.map(function (f) {
					return new ghfsItem(f);
				}));
			});
		}
	}]);

	return ghfs;
}();

;

var ghfsItem = function () {
	function ghfsItem(item) {
		_classCallCheck(this, ghfsItem);

		Object.assign(this, item);

		if (this.encoding == "base64") {
			this.contents = atob(this.contents);
			this.encoding = "utf8";
		}
	}

	_createClass(ghfsItem, [{
		key: "download",
		value: function download() {
			var cb = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

			get(this.download_url, cb);
		}
	}]);

	return ghfsItem;
}();

module.exports = ghfs;

},{}]},{},[1])(1)
});