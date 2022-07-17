"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMilestones = void 0;
const logger_1 = require("../../logger");
const debugLogger = (0, logger_1.getLogger)().extend('list-milestones');
/**
 * Get github milestones for a repository
 *
 * @export
 */
async function listMilestones(client, repo, owner) {
    const { data: milestones = [] } = await client.issues.listMilestones({
        repo,
        owner,
    });
    debugLogger(`found ${milestones?.length} milestones`);
    const githubMilestones = milestones.map(({ title, url, description, closed_issues: closedIssues, open_issues: openIssues, html_url: htmlUrl, state, }) => ({
        title,
        htmlUrl,
        description,
        url,
        openIssues,
        closedIssues,
        state,
    }));
    return githubMilestones;
}
exports.listMilestones = listMilestones;
