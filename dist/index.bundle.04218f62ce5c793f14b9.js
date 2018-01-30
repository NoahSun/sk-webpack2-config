(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory();
	else
		root["index"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/test/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/* // 在tsconfig.json中include了@types的声明文件后可不需要下面两种方式的引用\r\n// /// <reference path=\"../../node_modules/@types/jquery/index.d.ts\" />\r\n// import * as $ from \"jquery\";\r\n\r\nimport \"font-awesome/css/font-awesome.min.css\";\r\nimport \"../public/css/index.scss\";\r\n\r\nclass Person {\r\n    constructor(public name: string) {\r\n\r\n    }\r\n    say() {\r\n        console.log(this.name);\r\n    }\r\n}\r\n$(() => {\r\n    $(\"span\").css('color', 'yellow');\r\n    const person = new Person('Noah Sun');\r\n    person.say();\r\n}); */ \r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL2luZGV4LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAvaW5kZXgudHM/NjcwZCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiAvLyDlnKh0c2NvbmZpZy5qc29u5LitaW5jbHVkZeS6hkB0eXBlc+eahOWjsOaYjuaWh+S7tuWQjuWPr+S4jemcgOimgeS4i+mdouS4pOenjeaWueW8j+eahOW8leeUqFxyXG4vLyAvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL0B0eXBlcy9qcXVlcnkvaW5kZXguZC50c1wiIC8+XHJcbi8vIGltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xyXG5cclxuaW1wb3J0IFwiZm9udC1hd2Vzb21lL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1wiO1xyXG5pbXBvcnQgXCIuLi9wdWJsaWMvY3NzL2luZGV4LnNjc3NcIjtcclxuXHJcbmNsYXNzIFBlcnNvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcblxyXG4gICAgfVxyXG4gICAgc2F5KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSk7XHJcbiAgICB9XHJcbn1cclxuJCgoKSA9PiB7XHJcbiAgICAkKFwic3BhblwiKS5jc3MoJ2NvbG9yJywgJ3llbGxvdycpO1xyXG4gICAgY29uc3QgcGVyc29uID0gbmV3IFBlcnNvbignTm9haCBTdW4nKTtcclxuICAgIHBlcnNvbi5zYXkoKTtcclxufSk7ICovXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9hcHAvaW5kZXgudHMiXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app/index.ts\n");

/***/ })

/******/ });
});