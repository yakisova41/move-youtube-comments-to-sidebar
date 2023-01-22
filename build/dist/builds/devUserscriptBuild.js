"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var esbuild_1 = __importDefault(require("esbuild"));
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var writeUserscriptHeader_1 = __importDefault(require("../plugins/writeUserscriptHeader"));
exports["default"] = (function (plugins) {
    var _a;
    var workingDir = process.cwd();
    var packageJson = JSON.parse(fs_extra_1["default"].readFileSync(path_1["default"].join(workingDir, "package.json"), "utf8"));
    var hotReloadCliantconfig = {
        entryPoints: [path_1["default"].join(workingDir, "build/cliant", "index.ts")],
        outfile: path_1["default"].join(workingDir, "/dist", "index.user.js"),
        bundle: true,
        plugins: [(0, writeUserscriptHeader_1["default"])()]
    };
    var config = {
        logLevel: "info",
        entryPoints: [path_1["default"].join(workingDir, "/src", "index.ts")],
        outfile: path_1["default"].join(workingDir, "build/tmp", "dev.user.js"),
        bundle: true,
        watch: true,
        plugins: plugins
    };
    if (((_a = packageJson.userScript) === null || _a === void 0 ? void 0 : _a.esbuild) !== undefined) {
        Object.keys(packageJson.userScript.esbuild).forEach(function (key) {
            if (key !== "entryPoints") {
                hotReloadCliantconfig[key] =
                    packageJson.userScript.esbuild[key];
            }
            config[key] = packageJson.userScript.esbuild[key];
        });
    }
    esbuild_1["default"]
        .build(hotReloadCliantconfig)["catch"](function () { return process.exit(1); })
        .then(function () {
        esbuild_1["default"].build(config)["catch"](function () { return process.exit(1); });
    });
});
