"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var watch_1 = require("npm-watch-by-ts/dist/watch");
// By default, npm-watch-by-ts looks for files with the .js, .mjs, .coffee, .litcoffee, and .json extensions.
// If you want npm-watch-by-ts to looks for other files, add watchExtensions options.
exports.default = (0, watch_1.difineWatchConfig)({
    watchConfig: [{
            scriptName: 'restart',
            options: {
                watchPaths: [
                    "packages/ts-router"
                ],
                watchExtensions: ['ts'],
                ignorePaths: ["packages/ts-router/dist/*"],
                silent: false,
            }
        }]
});
