"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
var plugin_throttling_1 = require("@octokit/plugin-throttling");
var rest_1 = require("@octokit/rest");
var logger_1 = require("../../logger");
var logger = (0, logger_1.getLogger)();
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
    var ThrottledOctokit = rest_1.Octokit.plugin(plugin_throttling_1.throttling);
    var octokit = new ThrottledOctokit({
        auth: "token ".concat(githubToken),
        baseUrl: 'https://api.github.com',
        throttle: {
            onRateLimit: function (retryAfter, options, octokit) {
                octokit.log.warn("Request quota exhausted for request ".concat(options.method, " ").concat(options.url));
                if (options.request.retryCount <= 2) {
                    logger("Retrying after ".concat(retryAfter, " seconds!"));
                    return true;
                }
            },
            onAbuseLimit: function (_retryAfter, options, octokit) {
                // Does not retry, only logs a warning
                octokit.log.warn("Abuse detected for request ".concat(options.method, " ").concat(options.url));
            },
        },
    });
    return octokit;
}
exports.createClient = createClient;
