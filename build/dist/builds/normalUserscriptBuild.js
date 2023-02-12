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
var writeUserscriptHeader_1 = __importDefault(require("../plugins/writeUserscriptHeader"));
var fs_extra_1 = __importDefault(require("fs-extra"));
exports["default"] = (function (plugins, additionConfig) {
    var _a;
    var workingDir = process.cwd();
    var packageJson = JSON.parse(fs_extra_1["default"].readFileSync(path_1["default"].join(workingDir, "package.json"), "utf8"));
    var config = {
        logLevel: "info",
        entryPoints: [path_1["default"].join(workingDir, "src", "index.ts")],
        define: {
            "process.env.NODE_ENV": "'production'"
        },
        outfile: path_1["default"].join(workingDir, "dist", "index.user.js"),
        bundle: true,
        plugins: __spreadArray(__spreadArray([], plugins, true), [(0, writeUserscriptHeader_1["default"])()], false)
    };
    if (((_a = packageJson.userScript) === null || _a === void 0 ? void 0 : _a.esbuild) !== undefined) {
        Object.keys(packageJson.userScript.esbuild).forEach(function (key) {
            config[key] = packageJson.userScript.esbuild[key];
        });
    }
    Object.keys(additionConfig).forEach(function (key) {
        config[key] = additionConfig[key];
    });
    esbuild_1["default"].build(config)["catch"](function () { return process.exit(1); });
});
