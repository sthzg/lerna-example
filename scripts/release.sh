#!/usr/bin/env bash
dir=`pwd`
semver=`node ./scripts/checkForRelease.js`

if [ "${semver}" == "no-release" ];
then
    echo This build is not marked as release
else
    echo Start publishing as ${semver} release
    echo Authenticated at npm with user `npm whoami`
    lerna publish --cd-version ${semver} --yes --loglevel info
fi
