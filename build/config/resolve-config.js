"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveConfig = void 0;
const logger_1 = require("../logger");
const logger = (0, logger_1.getLogger)().extend('resolve-config');
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
    const githubToken = env.GH_TOKEN || env.GITHUB_TOKEN;
    // Options
    const { closeMilestones } = options;
    return { githubToken, closeMilestones };
}
exports.resolveConfig = resolveConfig;
