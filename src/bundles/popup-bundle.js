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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utility_chrome_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/chrome.js */ \"./src/utility/chrome.js\");\n\nasync function run() {\n    chrome.runtime.onMessage.addListener(async (message) => {\n        console.log(message);\n        if (message.methodName == \"onUpdateTranslatedProgress\") {\n            getProgressBar().value = message.value;\n        }\n    });\n    const translatedButton = document.getElementById(\"translated-by-deepL\");\n    if (translatedButton) {\n        translatedButton.onclick = async () => {\n            const tab = await new _utility_chrome_js__WEBPACK_IMPORTED_MODULE_0__.Chrome().getCurrentTabSync();\n            if (tab.id == null) {\n                return;\n            }\n            await applyTranslatedCaptionCSS(tab.id);\n            await notifyConvert(tab.id);\n        };\n    }\n}\nvoid run();\nfunction getProgressBar() {\n    return document.getElementById(\"upload-translated-caption-progress-bar\");\n}\nasync function notifyConvert(tabId) {\n    const customChrome = new _utility_chrome_js__WEBPACK_IMPORTED_MODULE_0__.Chrome();\n    const tab = await customChrome.getCurrentTabSync();\n    if (tab.id == null) {\n        return;\n    }\n    await customChrome.sendMessageSync(tabId, {\n        methodName: \"onNotifyConvert\"\n    });\n}\nasync function applyTranslatedCaptionCSS(tabId) {\n    const code = `.ytp-caption-segment{\n                visibility: hidden;\n            }\n            \n            .ytp-deepl-caption-segment{\n                visibility: visible !important;\n            }\n        `;\n    // note: removeCSSが型定義ファイルに存在しない\n    // @ts-ignore\n    chrome.tabs.removeCSS(tabId, { code: code });\n    chrome.tabs.insertCSS(tabId, { code: code });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zb3V0dWJlQ2FwdGlvbldyYXBwZXIvLi9zcmMvcG9wdXAvcG9wdXAuanM/ZmE0YyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHNEQUFNO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHNEQUFNO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxhQUFhO0FBQy9DLGtDQUFrQyxhQUFhO0FBQy9DIiwiZmlsZSI6Ii4vc3JjL3BvcHVwL3BvcHVwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hyb21lIH0gZnJvbSBcIi4uL3V0aWxpdHkvY2hyb21lLmpzXCI7XG5hc3luYyBmdW5jdGlvbiBydW4oKSB7XG4gICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGFzeW5jIChtZXNzYWdlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICBpZiAobWVzc2FnZS5tZXRob2ROYW1lID09IFwib25VcGRhdGVUcmFuc2xhdGVkUHJvZ3Jlc3NcIikge1xuICAgICAgICAgICAgZ2V0UHJvZ3Jlc3NCYXIoKS52YWx1ZSA9IG1lc3NhZ2UudmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCB0cmFuc2xhdGVkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmFuc2xhdGVkLWJ5LWRlZXBMXCIpO1xuICAgIGlmICh0cmFuc2xhdGVkQnV0dG9uKSB7XG4gICAgICAgIHRyYW5zbGF0ZWRCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhYiA9IGF3YWl0IG5ldyBDaHJvbWUoKS5nZXRDdXJyZW50VGFiU3luYygpO1xuICAgICAgICAgICAgaWYgKHRhYi5pZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgYXBwbHlUcmFuc2xhdGVkQ2FwdGlvbkNTUyh0YWIuaWQpO1xuICAgICAgICAgICAgYXdhaXQgbm90aWZ5Q29udmVydCh0YWIuaWQpO1xuICAgICAgICB9O1xuICAgIH1cbn1cbnZvaWQgcnVuKCk7XG5mdW5jdGlvbiBnZXRQcm9ncmVzc0JhcigpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGxvYWQtdHJhbnNsYXRlZC1jYXB0aW9uLXByb2dyZXNzLWJhclwiKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIG5vdGlmeUNvbnZlcnQodGFiSWQpIHtcbiAgICBjb25zdCBjdXN0b21DaHJvbWUgPSBuZXcgQ2hyb21lKCk7XG4gICAgY29uc3QgdGFiID0gYXdhaXQgY3VzdG9tQ2hyb21lLmdldEN1cnJlbnRUYWJTeW5jKCk7XG4gICAgaWYgKHRhYi5pZCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgY3VzdG9tQ2hyb21lLnNlbmRNZXNzYWdlU3luYyh0YWJJZCwge1xuICAgICAgICBtZXRob2ROYW1lOiBcIm9uTm90aWZ5Q29udmVydFwiXG4gICAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBhcHBseVRyYW5zbGF0ZWRDYXB0aW9uQ1NTKHRhYklkKSB7XG4gICAgY29uc3QgY29kZSA9IGAueXRwLWNhcHRpb24tc2VnbWVudHtcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC55dHAtZGVlcGwtY2FwdGlvbi1zZWdtZW50e1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IHZpc2libGUgIWltcG9ydGFudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYDtcbiAgICAvLyBub3RlOiByZW1vdmVDU1PjgYzlnovlrprnvqnjg5XjgqHjgqTjg6vjgavlrZjlnKjjgZfjgarjgYRcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY2hyb21lLnRhYnMucmVtb3ZlQ1NTKHRhYklkLCB7IGNvZGU6IGNvZGUgfSk7XG4gICAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHRhYklkLCB7IGNvZGU6IGNvZGUgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/popup/popup.js\n");

/***/ }),

/***/ "./src/utility/chrome.js":
/*!*******************************!*\
  !*** ./src/utility/chrome.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Chrome\": () => (/* binding */ Chrome)\n/* harmony export */ });\nclass Chrome {\n    getCurrentTabSync() {\n        return new Promise(resolve => {\n            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {\n                resolve(tabs[0]);\n            });\n        });\n    }\n    sendMessageSync(tabId, sendObj) {\n        return new Promise(resolve => {\n            chrome.tabs.sendMessage(tabId, sendObj, response => {\n                resolve(response);\n            });\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zb3V0dWJlQ2FwdGlvbldyYXBwZXIvLi9zcmMvdXRpbGl0eS9jaHJvbWUuanM/YTE4YSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQU87QUFDUDtBQUNBO0FBQ0EsK0JBQStCLG9DQUFvQztBQUNuRTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSIsImZpbGUiOiIuL3NyYy91dGlsaXR5L2Nocm9tZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDaHJvbWUge1xuICAgIGdldEN1cnJlbnRUYWJTeW5jKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCB0YWJzID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRhYnNbMF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZW5kTWVzc2FnZVN5bmModGFiSWQsIHNlbmRPYmopIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIHNlbmRPYmosIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/utility/chrome.js\n");

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