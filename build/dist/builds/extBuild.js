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
var fs_extra_1 = __importDefault(require("fs-extra"));
var glob_1 = __importDefault(require("glob"));
exports["default"] = (function (plugins) {
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
        plugins: __spreadArray([], plugins, true),
        minify: true
    };
    esbuild_1["default"]
        .build(config)
        .then(function () {
        fs_extra_1["default"].copyFileSync(path_1["default"].join(workingDir, "/manifest.json"), path_1["default"].join(workingDir, "/dist/extension/manifest.json"));
        if (fs_extra_1["default"].existsSync(path_1["default"].join(workingDir, "/src/extension/_locales"))) {
            fs_extra_1["default"].copySync(path_1["default"].join(workingDir, "/src/extension/_locales/"), path_1["default"].join(workingDir, "/dist/extension/_locales/"));
        }
        var matches = glob_1["default"].sync("./assets/**/*");
        matches.forEach(function (match) {
            var split = match.split("/");
            var filename = split[split.length - 1];
            fs_extra_1["default"].copyFileSync(path_1["default"].join(workingDir, match), path_1["default"].join(workingDir, "/dist/extension/", filename));
        });
    })["catch"]();
});
