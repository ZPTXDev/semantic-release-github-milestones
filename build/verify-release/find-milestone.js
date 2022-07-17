"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMilestone = void 0;
var lodash_1 = require("lodash");
function compareMilestone(milestones, value) {
    return (0, lodash_1.find)(milestones, function (_a) {
        var milestoneName = _a.title;
        return milestoneName === value;
    });
}
/**
 * Try to find a milestone by comparing it's title to:
 * 1. next release name (with v)
 * 2. next release version (without v)
 * 3. branch name
 * 4. channel name
 *
 * @export
 * @param {GithubMilestone[]} milestones
 * @param {string} [nextReleaseVersion]
 * @param {string} [nextReleaseName]
 * @param {string} [branchName]
 * @param {string} [channelName]
 * @return {*}  {(GithubMilestone | undefined)}
 */
function findMilestone(milestones, _a) {
    if (milestones === void 0) { milestones = []; }
    var _b = _a === void 0 ? {} : _a, nextReleaseVersion = _b.nextReleaseVersion, nextReleaseName = _b.nextReleaseName, branchName = _b.branchName, branchChannel = _b.branchChannel;
    var milestone;
    // Next release version
    milestone = compareMilestone(milestones, nextReleaseVersion);
    if (milestone) {
        return milestone;
    }
    // Next release name
    milestone = compareMilestone(milestones, nextReleaseName);
    if (milestone) {
        return milestone;
    }
    // Branch name
    milestone = compareMilestone(milestones, branchName);
    if (milestone) {
        return milestone;
    }
    // Channel name
    milestone = compareMilestone(milestones, branchChannel);
    if (milestone) {
        return milestone;
    }
    return undefined;
}
exports.findMilestone = findMilestone;
