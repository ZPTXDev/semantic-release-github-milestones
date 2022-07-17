"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const plugin_throttling_1 = require("@octokit/plugin-throttling");
const rest_1 = require("@octokit/rest");
const logger_1 = require("../../logger");
const logger = (0, logger_1.getLogger)();
/**
 * Create github client
 *
 * @export
 * @param {string} githubUrl
 * @param {string} githubToken
 * @return {*}  {Octokit}
 */
function createClient(githubToken) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const ThrottledOctokit = rest_1.Octokit.plugin(plugin_throttling_1.throttling);
    const octokit = new ThrottledOctokit({
        auth: `token ${githubToken}`,
        baseUrl: 'https://api.github.com',
        throttle: {
            onRateLimit: (retryAfter, options, octokit) => {
                octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`);
                if (options.request.retryCount <= 2) {
                    logger(`Retrying after ${retryAfter} seconds!`);
                    return true;
                }
            },
            onAbuseLimit: (_retryAfter, options, octokit) => {
                // Does not retry, only logs a warning
                octokit.log.warn(`Abuse detected for request ${options.method} ${options.url}`);
            },
        },
    });
    return octokit;
}
exports.createClient = createClient;
