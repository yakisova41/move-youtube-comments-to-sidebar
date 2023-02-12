"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var glob_1 = __importDefault(require("glob"));
exports["default"] = (function () { return ({
    name: "extensionBuild",
    setup: function (build) {
        build.onStart(function () {
            var workingDir = process.cwd();
            fs_extra_1["default"].copySync(path_1["default"].join(workingDir, "/manifest.json"), path_1["default"].join(workingDir, "/dist/extension/manifest.json"));
            if (fs_extra_1["default"].existsSync(path_1["default"].join(workingDir, "/src/extension/_locales"))) {
                fs_extra_1["default"].copySync(path_1["default"].join(workingDir, "/src/extension/_locales/"), path_1["default"].join(workingDir, "/dist/extension/_locales/"));
            }
            var matches = glob_1["default"].sync("./assets/**/*");
            matches.forEach(function (match) {
                var split = match.split("/");
                var filename = split[split.length - 1];
                fs_extra_1["default"].copySync(path_1["default"].join(workingDir, match), path_1["default"].join(workingDir, "/dist/extension/", filename));
            });
        });
    }
}); });
