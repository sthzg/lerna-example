#!/usr/bin/env bash
dir=`pwd`
semver=`node ./scripts/checkForRelease.js`

if [ "${semver}" == "no-release" ];
then
    echo This build is not marked as release
else
    echo Start publishing as ${semver} release
    lerna publish --cd-version ${semver}
fi
