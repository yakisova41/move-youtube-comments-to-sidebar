"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var build_1 = __importDefault(require("./build"));
var getArgv_1 = __importDefault(require("./modules/getArgv"));
var argv = (0, getArgv_1["default"])();
(0, build_1["default"])(argv["mode"]);
