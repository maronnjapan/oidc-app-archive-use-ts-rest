import { difineWatchConfig } from 'npm-watch-by-ts/dist/watch'
// By default, npm-watch-by-ts looks for files with the .js, .mjs, .coffee, .litcoffee, and .json extensions.
// If you want npm-watch-by-ts to looks for other files, add watchExtensions options.
export default difineWatchConfig({
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
})
