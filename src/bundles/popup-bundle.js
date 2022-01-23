/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup/popup.js":
/*!****************************!*\
  !*** ./src/popup/popup.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utility_chrome_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/chrome.js */ \"./src/utility/chrome.js\");\n\r\nasync function run() {\r\n    chrome.runtime.onMessage.addListener(async (message) => {\r\n        console.log(message);\r\n        if (message.methodName == \"onUpdateTranslatedProgress\") {\r\n            getProgressBar().value = message.value;\r\n        }\r\n    });\r\n    const translatedButton = document.getElementById(\"translated-by-deepL\");\r\n    if (translatedButton) {\r\n        translatedButton.onclick = async () => {\r\n            const tab = await new _utility_chrome_js__WEBPACK_IMPORTED_MODULE_0__.Chrome().getCurrentTabSync();\r\n            if (tab.id == null) {\r\n                return;\r\n            }\r\n            await applyTranslatedCaptionCSS(tab.id);\r\n            await notifyConvert(tab.id);\r\n        };\r\n    }\r\n}\r\nvoid run();\r\nfunction getProgressBar() {\r\n    return document.getElementById(\"upload-translated-caption-progress-bar\");\r\n}\r\nasync function notifyConvert(tabId) {\r\n    const customChrome = new _utility_chrome_js__WEBPACK_IMPORTED_MODULE_0__.Chrome();\r\n    const tab = await customChrome.getCurrentTabSync();\r\n    if (tab.id == null) {\r\n        return;\r\n    }\r\n    await customChrome.sendMessageSync(tabId, {\r\n        methodName: \"onNotifyConvert\"\r\n    });\r\n}\r\nasync function applyTranslatedCaptionCSS(tabId) {\r\n    const code = `.ytp-caption-segment{\r\n                visibility: hidden;\r\n            }\r\n            \r\n            .ytp-deepl-caption-segment{\r\n                visibility: visible !important;\r\n            }\r\n        `;\r\n    // note: removeCSSが型定義ファイルに存在しない\r\n    // @ts-ignore\r\n    chrome.tabs.removeCSS(tabId, { code: code });\r\n    chrome.tabs.insertCSS(tabId, { code: code });\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zb3V0dWJlQ2FwdGlvbldyYXBwZXIvLi9zcmMvcG9wdXAvcG9wdXAuanM/ZmE0YyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHNEQUFNO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHNEQUFNO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxhQUFhO0FBQy9DLGtDQUFrQyxhQUFhO0FBQy9DIiwiZmlsZSI6Ii4vc3JjL3BvcHVwL3BvcHVwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hyb21lIH0gZnJvbSBcIi4uL3V0aWxpdHkvY2hyb21lLmpzXCI7XHJcbmFzeW5jIGZ1bmN0aW9uIHJ1bigpIHtcclxuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgIGlmIChtZXNzYWdlLm1ldGhvZE5hbWUgPT0gXCJvblVwZGF0ZVRyYW5zbGF0ZWRQcm9ncmVzc1wiKSB7XHJcbiAgICAgICAgICAgIGdldFByb2dyZXNzQmFyKCkudmFsdWUgPSBtZXNzYWdlLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhbnNsYXRlZC1ieS1kZWVwTFwiKTtcclxuICAgIGlmICh0cmFuc2xhdGVkQnV0dG9uKSB7XHJcbiAgICAgICAgdHJhbnNsYXRlZEJ1dHRvbi5vbmNsaWNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YWIgPSBhd2FpdCBuZXcgQ2hyb21lKCkuZ2V0Q3VycmVudFRhYlN5bmMoKTtcclxuICAgICAgICAgICAgaWYgKHRhYi5pZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXdhaXQgYXBwbHlUcmFuc2xhdGVkQ2FwdGlvbkNTUyh0YWIuaWQpO1xyXG4gICAgICAgICAgICBhd2FpdCBub3RpZnlDb252ZXJ0KHRhYi5pZCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG52b2lkIHJ1bigpO1xyXG5mdW5jdGlvbiBnZXRQcm9ncmVzc0JhcigpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZC10cmFuc2xhdGVkLWNhcHRpb24tcHJvZ3Jlc3MtYmFyXCIpO1xyXG59XHJcbmFzeW5jIGZ1bmN0aW9uIG5vdGlmeUNvbnZlcnQodGFiSWQpIHtcclxuICAgIGNvbnN0IGN1c3RvbUNocm9tZSA9IG5ldyBDaHJvbWUoKTtcclxuICAgIGNvbnN0IHRhYiA9IGF3YWl0IGN1c3RvbUNocm9tZS5nZXRDdXJyZW50VGFiU3luYygpO1xyXG4gICAgaWYgKHRhYi5pZCA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgY3VzdG9tQ2hyb21lLnNlbmRNZXNzYWdlU3luYyh0YWJJZCwge1xyXG4gICAgICAgIG1ldGhvZE5hbWU6IFwib25Ob3RpZnlDb252ZXJ0XCJcclxuICAgIH0pO1xyXG59XHJcbmFzeW5jIGZ1bmN0aW9uIGFwcGx5VHJhbnNsYXRlZENhcHRpb25DU1ModGFiSWQpIHtcclxuICAgIGNvbnN0IGNvZGUgPSBgLnl0cC1jYXB0aW9uLXNlZ21lbnR7XHJcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC55dHAtZGVlcGwtY2FwdGlvbi1zZWdtZW50e1xyXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgYDtcclxuICAgIC8vIG5vdGU6IHJlbW92ZUNTU+OBjOWei+Wumue+qeODleOCoeOCpOODq+OBq+WtmOWcqOOBl+OBquOBhFxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY2hyb21lLnRhYnMucmVtb3ZlQ1NTKHRhYklkLCB7IGNvZGU6IGNvZGUgfSk7XHJcbiAgICBjaHJvbWUudGFicy5pbnNlcnRDU1ModGFiSWQsIHsgY29kZTogY29kZSB9KTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/popup/popup.js\n");

/***/ }),

/***/ "./src/utility/chrome.js":
/*!*******************************!*\
  !*** ./src/utility/chrome.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Chrome\": () => (/* binding */ Chrome)\n/* harmony export */ });\nclass Chrome {\r\n    getCurrentTabSync() {\r\n        return new Promise(resolve => {\r\n            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {\r\n                resolve(tabs[0]);\r\n            });\r\n        });\r\n    }\r\n    sendMessageSync(tabId, sendObj) {\r\n        return new Promise(resolve => {\r\n            chrome.tabs.sendMessage(tabId, sendObj, response => {\r\n                resolve(response);\r\n            });\r\n        });\r\n    }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zb3V0dWJlQ2FwdGlvbldyYXBwZXIvLi9zcmMvdXRpbGl0eS9jaHJvbWUuanM/YTE4YSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQU87QUFDUDtBQUNBO0FBQ0EsK0JBQStCLG9DQUFvQztBQUNuRTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSIsImZpbGUiOiIuL3NyYy91dGlsaXR5L2Nocm9tZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDaHJvbWUge1xyXG4gICAgZ2V0Q3VycmVudFRhYlN5bmMoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCB0YWJzID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGFic1swXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2VuZE1lc3NhZ2VTeW5jKHRhYklkLCBzZW5kT2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJJZCwgc2VuZE9iaiwgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/utility/chrome.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/popup/popup.js");
/******/ 	
/******/ })()
;