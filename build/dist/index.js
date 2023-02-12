"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var getArgv_1 = __importDefault(require("./modules/getArgv"));
var esbuild_ssr_css_modules_plugin_1 = __importDefault(require("esbuild-ssr-css-modules-plugin"));
var esbuild_plugin_eslint_1 = __importDefault(require("esbuild-plugin-eslint"));
var normalUserscriptBuild_1 = __importDefault(require("./builds/normalUserscriptBuild"));
var devUserscriptBuild_1 = __importDefault(require("./builds/devUserscriptBuild"));
var extBuild_1 = __importDefault(require("./builds/extBuild"));
var argv = (0, getArgv_1["default"])();
var mode = argv.mode, esbuildConfig = __rest(argv, ["mode"]);
var build = function (mode) {
    var plugins = [
        (0, esbuild_ssr_css_modules_plugin_1["default"])({
            jsCSSInject: true
        }),
        (0, esbuild_plugin_eslint_1["default"])(),
    ];
    switch (mode) {
        case "build":
            (0, normalUserscriptBuild_1["default"])(plugins, esbuildConfig);
            break;
        case "dev":
            (0, devUserscriptBuild_1["default"])(plugins);
            break;
        case "ext":
            (0, extBuild_1["default"])(plugins, esbuildConfig);
            break;
    }
};
build(mode);
