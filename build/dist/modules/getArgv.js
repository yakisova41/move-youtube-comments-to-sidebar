"use strict";
exports.__esModule = true;
exports["default"] = (function () {
    var argv = process.argv;
    var result = {};
    argv.forEach(function (arg, index) {
        if (index > 1) {
            var _a = arg.split("="), argName = _a[0], argValue = _a[1];
            if (argValue === undefined) {
                result[argName] = true;
            }
            else {
                result[argName] = argValue;
            }
        }
    });
    return result;
});
