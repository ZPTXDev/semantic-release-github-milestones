"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGithub = void 0;
const error_1 = __importDefault(require("@semantic-release/error"));
const git_url_parse_1 = __importDefault(require("git-url-parse"));
const resolve_config_1 = require("../config/resolve-config");
const create_client_1 = require("../github/client/create-client");
const list_milestones_1 = require("../github/utils/list-milestones");
const logger_1 = require("../logger");
const debugLogger = (0, logger_1.getLogger)();
/**
 * Called by semantic-release during the verification step
 * @param {*} pluginConfig The semantic-release plugin config
 * @param {*} context The context provided by semantic-release
 */
async function verifyGithub(pluginConfig, context) {
    const { env, options } = context;
    const errors = [];
    const { repositoryUrl = '' } = options;
    // Build config
    const config = (0, resolve_config_1.resolveConfig)(options, env);
    pluginConfig.config = config;
    debugLogger(`config=${JSON.stringify(config, null, 2)}`);
    // Extract git url information
    const { name: repoName, owner: repoOwner } = (0, git_url_parse_1.default)(repositoryUrl);
    debugLogger(`repo=${repositoryUrl} name=${repoName} owner=${repoOwner}`);
    if (!repoName) {
        errors.push(new error_1.default('could not parse repository name'));
    }
    if (!repoOwner) {
        errors.push(new error_1.default('could not parse repository owner'));
    }
    pluginConfig.repoOwner = repoOwner;
    pluginConfig.repoName = repoName;
    // List milestones
    const client = (0, create_client_1.createClient)(config.githubToken);
    const githubMilestones = await (0, list_milestones_1.listMilestones)(client, repoName, repoOwner);
    if (errors.length > 0) {
        throw new AggregateError(errors);
    }
    return githubMilestones;
}
exports.verifyGithub = verifyGithub;
