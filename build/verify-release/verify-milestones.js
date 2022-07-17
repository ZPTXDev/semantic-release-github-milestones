"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMilestones = void 0;
const aggregate_error_1 = __importDefault(require("aggregate-error"));
const node_emoji_1 = require("node-emoji");
const logger_1 = require("../logger");
const find_milestone_1 = require("./find-milestone");
const debugLogger = (0, logger_1.getLogger)();
/**
 * Verify github milestones
 *
 * @export
 * @param {GlobalConfig} pluginConfig
 * @param {Context} context
 * @param {GithubMilestone[]} milestones
 */
async function verifyMilestones(pluginConfig, context, milestones) {
    const { logger, nextRelease } = context;
    const errors = [];
    const branch = context.branch;
    const { version: nextReleaseVersion } = nextRelease ?? {};
    const { name: branchName, channel: branchChannel } = branch;
    const nextReleaseName = nextRelease.name;
    debugLogger(`branch=${JSON.stringify(branch, null, 2)}`);
    debugLogger(`nextRelease = ${JSON.stringify(nextRelease, null, 2)}`);
    // Find milestone by one of the options
    const milestone = (0, find_milestone_1.findMilestone)(milestones, {
        nextReleaseVersion,
        nextReleaseName,
        branchName,
        branchChannel,
    });
    if (milestone) {
        const { openIssues = 0, closedIssues = 0, title = '', htmlUrl } = milestone;
        logger.log((0, node_emoji_1.emojify)(`:triangular_flag_on_post: Github Milestone: ${title ?? ''}  :triangular_flag_on_post:`));
        logger.log((0, node_emoji_1.emojify)(`(${htmlUrl})`));
        logger.log((0, node_emoji_1.emojify)(`${openIssues + closedIssues} total issues`));
        if (openIssues > 0) {
            logger.log((0, node_emoji_1.emojify)(`:warning: :warning:  ${openIssues} open issues :warning: :warning:`));
        }
        else {
            logger.log((0, node_emoji_1.emojify)(`No open issues :heavy_check_mark:`));
        }
    }
    if (errors.length > 0) {
        throw new aggregate_error_1.default(errors);
    }
}
exports.verifyMilestones = verifyMilestones;
