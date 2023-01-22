"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
exports["default"] = (function () { return ({
    name: "writeUserscriptHeader",
    setup: function (build) {
        build.onEnd(function () {
            var workingDir = process.cwd();
            var packageJson = JSON.parse(fs_1["default"].readFileSync(path_1["default"].join(workingDir, "package.json"), "utf8"));
            var outFile = build.initialOptions.outfile;
            var buildResult = fs_1["default"].readFileSync(outFile);
            var userscriptHeaders = [];
            userscriptHeaders.push("// ==UserScript==");
            Object.keys(packageJson.userScript).forEach(function (key) {
                if (key[0] === "@") {
                    userscriptHeaders.push("// ".concat(key, " ").concat(packageJson["userScript"][key]));
                }
            });
            userscriptHeaders.push("// ==/UserScript==");
            fs_1["default"].writeFileSync(outFile, [userscriptHeaders.join("\n"), buildResult].join("\n\n"));
        });
    }
}); });
