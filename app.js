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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "https://harddomain.sharepoint.com/sites/Wall/Style Library/webparts";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar SharePointLoader = /** @class */ (function () {\r\n    function SharePointLoader(url) {\r\n        this.url = url;\r\n        this.clientContext = new SP.ClientContext(this.url);\r\n    }\r\n    SharePointLoader.prototype.loadList = function (name, onSuccess, onFail) {\r\n        if (onFail === void 0) { onFail = function (args) { }; }\r\n        var targetList = this.clientContext.get_web().get_lists().getByTitle(name);\r\n        var query = SP.CamlQuery.createAllItemsQuery();\r\n        var items = targetList.getItems(query);\r\n        this.clientContext.load(items);\r\n        this.clientContext.executeQueryAsync(Function.createDelegate(this, onSuccess.bind(this, items)), function (sender, args) { return onFail(args); });\r\n    };\r\n    SharePointLoader.prototype.insertItem = function (listName, item, onSuccess, onFail) {\r\n        if (onSuccess === void 0) { onSuccess = function () { }; }\r\n        if (onFail === void 0) { onFail = function () { }; }\r\n        var targetList = this.clientContext.get_web().get_lists().getByTitle(listName);\r\n        var itemCreateInfo = new SP.ListItemCreationInformation();\r\n        var newItem = targetList.addItem(itemCreateInfo);\r\n        for (var _i = 0, _a = Object.entries(item); _i < _a.length; _i++) {\r\n            var _b = _a[_i], key = _b[0], value = _b[1];\r\n            newItem.set_item(key, value);\r\n        }\r\n        newItem.update();\r\n        this.clientContext.load(newItem);\r\n        this.clientContext.executeQueryAsync(onSuccess, onFail);\r\n    };\r\n    SharePointLoader.prototype.updateItem = function (listName, itemId, properties, onSuccess, onFail) {\r\n        if (onSuccess === void 0) { onSuccess = function () { }; }\r\n        if (onFail === void 0) { onFail = function () { }; }\r\n        var targetList = this.clientContext.get_web().get_lists().getByTitle(listName);\r\n        var oListItem = targetList.getItemById(itemId);\r\n        for (var _i = 0, _a = Object.entries(properties); _i < _a.length; _i++) {\r\n            var _b = _a[_i], key = _b[0], value = _b[1];\r\n            oListItem.set_item(key, value);\r\n        }\r\n        oListItem.update();\r\n        this.clientContext.executeQueryAsync(onSuccess, onFail);\r\n    };\r\n    return SharePointLoader;\r\n}());\r\nfunction SPImageToModel(item) {\r\n    return { brand: item.get_item(\"Brand\"), model: item.get_item(\"Model\"), url: item.get_item(\"Image\").get_url() };\r\n}\r\nfunction SPPartToModel(item) {\r\n    return { brand: item.get_item(\"Brand\"), model: item.get_item(\"Model\"), name: item.get_item(\"Name\"),\r\n        amount: item.get_item(\"Amount\"), price: item.get_item(\"UnitPrice\") + \" zł\" };\r\n}\r\n$(document).ready(function () {\r\n    var images = [];\r\n    var parts = [];\r\n    ExecuteOrDelayUntilScriptLoaded(function () {\r\n        var sp = new SharePointLoader(\"https://harddomain.sharepoint.com/sites/Wall\");\r\n        sp.loadList(\"Cars\", function (list) {\r\n            var listEnumerator = list.getEnumerator();\r\n            while (listEnumerator.moveNext()) {\r\n                var m = listEnumerator.get_current();\r\n                images.push(SPImageToModel(m));\r\n            }\r\n            if (images.length && parts.length)\r\n                buildKendoUI(images, parts);\r\n        }, function (args) {\r\n            alert('Request failed. ' + args.get_message() + '\\n' + args.get_stackTrace());\r\n        });\r\n        sp.loadList(\"CarParts\", function (list) {\r\n            var listEnumerator = list.getEnumerator();\r\n            while (listEnumerator.moveNext()) {\r\n                var m = listEnumerator.get_current();\r\n                parts.push(SPPartToModel(m));\r\n            }\r\n            if (images.length && parts.length)\r\n                buildKendoUI(images, parts);\r\n        }, function (args) {\r\n            \"\";\r\n            alert('Request failed. ' + args.get_message() + '\\n' + args.get_stackTrace());\r\n        });\r\n    }, \"sp.js\");\r\n});\r\nfunction buildKendoUI(images, parts) {\r\n    var brands = Array.from(new Set(images.map(function (i) { return i.brand; })).values()).map(function (a) {\r\n        return { text: a, value: a };\r\n    });\r\n    var chosenBrand = brands[0].text;\r\n    var chosenModel;\r\n    // create DropDownList from input HTML element\r\n    $(\"#brand\").kendoDropDownList({\r\n        dataTextField: \"text\",\r\n        dataValueField: \"value\",\r\n        dataSource: brands,\r\n        index: 0,\r\n        optionLabel: \"select brand\",\r\n        change: function (e) {\r\n            chosenBrand = this.dataItem().text;\r\n            var data = new kendo.data.DataSource({\r\n                data: Array.from(new Set(images.filter(function (i) { return i.brand == chosenBrand; }).map(function (i) { return i.model; })).values()).map(function (a) {\r\n                    return { text: a, value: a };\r\n                })\r\n            });\r\n            $(\"#model\").data(\"kendoDropDownList\").setDataSource(data);\r\n        }\r\n    });\r\n    $(\"#model\").kendoDropDownList({\r\n        dataTextField: \"text\",\r\n        dataValueField: \"value\",\r\n        dataSource: {\r\n            data: Array.from(new Set(images.filter(function (i) { return i.brand == chosenBrand; }).map(function (i) { return i.model; })).values()).map(function (a) {\r\n                return { text: a, value: a };\r\n            })\r\n        },\r\n        index: 0,\r\n        optionLabel: \"select model\",\r\n        change: function (e) {\r\n            var _a;\r\n            chosenModel = this.dataItem().text;\r\n            var url = (_a = images.filter(function (i) { return i.brand == chosenBrand && i.model == chosenModel; })[0]) === null || _a === void 0 ? void 0 : _a.url;\r\n            $(\"#photo\").attr(\"src\", url);\r\n            var amountOfParts = parts.filter(function (i) { return i.brand == chosenBrand && i.model == chosenModel; })\r\n                .map(function (p) { return p.amount; }).reduce(function (t, n) { return t + n; }, 0);\r\n            $(\"#numberOfParts\").html(\"Total parts: \" + amountOfParts);\r\n            var data = new kendo.data.DataSource({\r\n                data: parts.filter(function (i) { return i.brand == chosenBrand && i.model == chosenModel; }).map(function (p) {\r\n                    return { \"Name\": p.name, \"Amount\": p.amount, \"UnitPrice\": p.price };\r\n                })\r\n            });\r\n            $(\"#grid\").data(\"kendoGrid\").setDataSource(data);\r\n        }\r\n    });\r\n    $(\"#grid\").kendoGrid({\r\n        dataSource: { data: [] },\r\n        sortable: true,\r\n        columns: [{ field: \"Name\", title: \"Name\" },\r\n            { field: \"Amount\", title: \"Amount\" },\r\n            { field: \"UnitPrice\", title: \"Unit price\" }]\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./app.ts?");

/***/ })

/******/ });