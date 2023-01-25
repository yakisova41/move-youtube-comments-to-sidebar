"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
exports.__esModule = true;
var chokidar_1 = __importDefault(require("chokidar"));
var path_1 = __importDefault(require("path"));
var ws_1 = __importDefault(require("ws"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var workingDir = process.cwd();
var packageJson = JSON.parse(fs_extra_1["default"].readFileSync(path_1["default"].join(workingDir, "package.json"), "utf8"));
var host;
var port;
var sockport;
var hot;
((_a = packageJson.userScript.devServer) === null || _a === void 0 ? void 0 : _a.host)
    ? (host = packageJson.userScript.devServer.host)
    : (host = "127.0.0.1");
((_b = packageJson.userScript.devServer) === null || _b === void 0 ? void 0 : _b.port)
    ? (port = packageJson.userScript.devServer.port)
    : (port = 8080);
((_c = packageJson.userScript.devServer) === null || _c === void 0 ? void 0 : _c.websocket)
    ? (sockport = packageJson.userScript.devServer.websocket)
    : (sockport = 5001);
((_d = packageJson.userScript.devServer) === null || _d === void 0 ? void 0 : _d.hot) ? (hot = true) : (hot = false);
if (hot) {
    var wserver_1 = new ws_1["default"].Server({ port: sockport });
    console.log("\u001B[46m\n\n\u001B[1m HotReload server Running: ws://localhost:".concat(sockport, "\n\u001B[49m"));
    wserver_1.on("connection", function (ws) {
        ws.send("connect");
    });
    var watcher_1 = chokidar_1["default"].watch(path_1["default"].join(__dirname, "/../tmp/"));
    watcher_1.on("ready", function () {
        watcher_1.on("change", function (e) {
            wserver_1.clients.forEach(function (client) {
                console.log("Reloading...");
                client.send("reload");
            });
        });
    });
}
