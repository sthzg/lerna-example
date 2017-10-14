/**
 * @file checks whether latest commit should trigger a release
 *
 * We check whether a successful build should issue a release by analyzing the latest commit message. Valid triggers
 * are commit messages that start with `release(<semver>)`. See `semverRegEx` for supported values.
 */
const Git = require('nodegit');
const path  = require('path');

const semverRegEx = /^release\((master|minor|patch|premajor|preminor|prepatch|prerelease)\).*/;

function shouldPublish(check) {
    return check !== null;
}

function extractSemver(commitMessage) {
    return commitMessage.match(semverRegEx);
}

async function getLatestCommitMessage(repo) {
    const latestCommit = await repo.getBranchCommit("master");
    return latestCommit.message();
}

async function findSemver() {
    const repoPath = path.resolve(__dirname, '../.git');
    const repo = await Git.Repository.open(repoPath);
    const latestCommitMessage = await getLatestCommitMessage(repo);
    const check = extractSemver(latestCommitMessage);

    return shouldPublish(check)
        ? check[1]
        : 'no-release';
}

async function run() {
    const result = await findSemver();
    console.log(result);
}

run();
