"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var getArgv_1 = __importDefault(require("./modules/getArgv"));
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var workingDir = process.cwd();
var packageJson = JSON.parse(fs_extra_1["default"].readFileSync(path_1["default"].join(workingDir, "package.json"), "utf8"));
var argv = (0, getArgv_1["default"])();
var host;
var port;
((_a = packageJson.userScript.devServer) === null || _a === void 0 ? void 0 : _a.host)
    ? (host = packageJson.userScript.devServer.host)
    : (host = "127.0.0.1");
((_b = packageJson.userScript.devServer) === null || _b === void 0 ? void 0 : _b.port)
    ? (port = packageJson.userScript.devServer.port)
    : (port = 8080);
var app = (0, express_1["default"])();
app.get("/index.user.js", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(path_1["default"].join(workingDir, "/dist/", "index.user.js"));
});
app.get("/script", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    if ((argv["mode"] = "dev")) {
        res.sendFile(path_1["default"].join(workingDir, "/scripts/build/tmp", "dev.user.js"));
    }
});
try {
    app.listen(port, host, function () {
        var realscript = "";
        if ((argv["mode"] = "dev")) {
            realscript = "\n Real script url: http://".concat(host, ":").concat(port, "/script");
        }
        console.log("\u001B[43m\n\n\u001B[1m Userscript url: http://".concat(host, ":").concat(port, "/index.user.js").concat(realscript, "\n\u001B[49m"));
    });
}
catch (err) {
    process.exit(1);
}
