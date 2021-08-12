#!/bin/bash

function runCommand {
    cmd=$1
    $cmd
    status=$?
    if [ ! $status -eq 0 ]; then
        exit 1
    fi
}

echo "Clearing bin folder..."
rm -rf ./dist

echo "Transpile files..."
runCommand "./node_modules/.bin/tsc -p deploy/tsconfig.source.json"

echo "Build binaries..."
runCommand "node ./deploy/build.js"

echo "Build tools..."
runCommand "./node_modules/.bin/tsc -d -p deploy/tsconfig.tools.json"

echo "Copying final files..."
runCommand "node ./deploy/post-build.js"
runCommand "cp -a ./dist/src/config/addons/ ./dist/bin/"
runCommand "cp -a ./dist/src/config/utils/ ./dist/bin/"
runCommand "cp -a ./readme.md ./dist/bin/"
runCommand "cp -a ./tsconfig.json ./dist/bin/"
runCommand "cp -a ./package.json ./dist/bin/"
runCommand "cp -a ./custom.d.ts ./dist/bin/"
