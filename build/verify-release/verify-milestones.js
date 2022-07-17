"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMilestones = void 0;
var aggregate_error_1 = __importDefault(require("aggregate-error"));
var node_emoji_1 = require("node-emoji");
var logger_1 = require("../logger");
var find_milestone_1 = require("./find-milestone");
var debugLogger = (0, logger_1.getLogger)();
/**
 * Verify github milestones
 *
 * @export
 * @param {GlobalConfig} pluginConfig
 * @param {Context} context
 * @param {GithubMilestone[]} milestones
 */
function verifyMilestones(pluginConfig, context, milestones) {
    return __awaiter(this, void 0, void 0, function () {
        var logger, nextRelease, errors, branch, nextReleaseVersion, branchName, branchChannel, nextReleaseName, milestone, _a, openIssues, _b, closedIssues, _c, title, htmlUrl;
        return __generator(this, function (_d) {
            logger = context.logger, nextRelease = context.nextRelease;
            errors = [];
            branch = context.branch;
            nextReleaseVersion = (nextRelease !== null && nextRelease !== void 0 ? nextRelease : {}).version;
            branchName = branch.name, branchChannel = branch.channel;
            nextReleaseName = nextRelease.name;
            debugLogger("branch=".concat(JSON.stringify(branch, null, 2)));
            debugLogger("nextRelease = ".concat(JSON.stringify(nextRelease, null, 2)));
            milestone = (0, find_milestone_1.findMilestone)(milestones, {
                nextReleaseVersion: nextReleaseVersion,
                nextReleaseName: nextReleaseName,
                branchName: branchName,
                branchChannel: branchChannel,
            });
            if (milestone) {
                _a = milestone.openIssues, openIssues = _a === void 0 ? 0 : _a, _b = milestone.closedIssues, closedIssues = _b === void 0 ? 0 : _b, _c = milestone.title, title = _c === void 0 ? '' : _c, htmlUrl = milestone.htmlUrl;
                logger.log((0, node_emoji_1.emojify)(":triangular_flag_on_post: Github Milestone: ".concat(title !== null && title !== void 0 ? title : '', "  :triangular_flag_on_post:")));
                logger.log((0, node_emoji_1.emojify)("(".concat(htmlUrl, ")")));
                logger.log((0, node_emoji_1.emojify)("".concat(openIssues + closedIssues, " total issues")));
                if (openIssues > 0) {
                    logger.log((0, node_emoji_1.emojify)(":warning: :warning:  ".concat(openIssues, " open issues :warning: :warning:")));
                }
                else {
                    logger.log((0, node_emoji_1.emojify)("No open issues :heavy_check_mark:"));
                }
            }
            if (errors.length > 0) {
                throw new aggregate_error_1.default(errors);
            }
            return [2 /*return*/];
        });
    });
}
exports.verifyMilestones = verifyMilestones;
