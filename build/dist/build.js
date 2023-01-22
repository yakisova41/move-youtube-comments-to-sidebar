"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var esbuild_ssr_css_modules_plugin_1 = __importDefault(require("esbuild-ssr-css-modules-plugin"));
var esbuild_plugin_eslint_1 = __importDefault(require("esbuild-plugin-eslint"));
var normalUserscriptBuild_1 = __importDefault(require("./builds/normalUserscriptBuild"));
var devUserscriptBuild_1 = __importDefault(require("./builds/devUserscriptBuild"));
var extBuild_1 = __importDefault(require("./builds/extBuild"));
exports["default"] = (function (mode) {
    var plugins = [
        (0, esbuild_ssr_css_modules_plugin_1["default"])({
            jsCSSInject: true
        }),
        (0, esbuild_plugin_eslint_1["default"])(),
    ];
    switch (mode) {
        case "build":
            (0, normalUserscriptBuild_1["default"])(plugins);
            break;
        case "dev":
            (0, devUserscriptBuild_1["default"])(plugins);
            break;
        case "ext":
            (0, extBuild_1["default"])(plugins);
            break;
    }
});
