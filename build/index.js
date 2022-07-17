"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = exports.verifyRelease = exports.verifyConditions = void 0;
const verify_github_1 = require("./verify-conditions/verify-github");
const verify_milestones_1 = require("./verify-release/verify-milestones");
let verified;
let milestones = [];
async function verifyConditions(pluginConfig, context) {
    // Verify conditions
    milestones = await (0, verify_github_1.verifyGithub)(pluginConfig, context);
    verified = true;
}
exports.verifyConditions = verifyConditions;
async function verifyRelease(pluginConfig, context) {
    if (!verified) {
        await (0, verify_github_1.verifyGithub)(pluginConfig, context);
        verified = true;
    }
    await (0, verify_milestones_1.verifyMilestones)(pluginConfig, context, milestones);
}
exports.verifyRelease = verifyRelease;
async function publish(pluginConfig, context) {
    if (!verified) {
        await (0, verify_github_1.verifyGithub)(pluginConfig, context);
        verified = true;
    }
}
exports.publish = publish;
