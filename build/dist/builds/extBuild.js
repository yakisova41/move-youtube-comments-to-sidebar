"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var esbuild_1 = __importDefault(require("esbuild"));
var path_1 = __importDefault(require("path"));
var glob_1 = __importDefault(require("glob"));
var extensionBuild_1 = __importDefault(require("../plugins/extensionBuild"));
exports["default"] = (function (plugins, additionConfig) {
    var workingDir = process.cwd();
    var entryPoints = glob_1["default"].sync("./src/extension/**/*.ts");
    var config = {
        logLevel: "info",
        entryPoints: entryPoints,
        define: {
            "process.env.NODE_ENV": "'production'"
        },
        outdir: path_1["default"].join(workingDir, "/dist/extension"),
        bundle: true,
        plugins: __spreadArray(__spreadArray([], plugins, true), [(0, extensionBuild_1["default"])()], false),
        minify: true
    };
    Object.keys(additionConfig).forEach(function (key) {
        config[key] = additionConfig[key];
    });
    esbuild_1["default"].build(config)["catch"](function () { return process.exit(1); });
});
