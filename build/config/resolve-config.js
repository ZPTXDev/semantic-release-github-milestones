"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveConfig = void 0;
var logger_1 = require("../logger");
var logger = (0, logger_1.getLogger)().extend('resolve-config');
/**
 * Resolve config from options and environment variables
 *
 * @export
 * @param {Options} options
 * @param {Record<string, string>} env
 * @return {*}  {PluginConfig}
 */
function resolveConfig(options, env) {
    logger('reading envs');
    // Envs
    var githubToken = env.GH_TOKEN || env.GITHUB_TOKEN;
    // Options
    var closeMilestones = options.closeMilestones;
    return { githubToken: githubToken, closeMilestones: closeMilestones };
}
exports.resolveConfig = resolveConfig;
