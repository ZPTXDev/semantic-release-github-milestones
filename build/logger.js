"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
const debug_1 = __importDefault(require("debug"));
let logger;
function getLogger() {
    if (!logger) {
        logger = (0, debug_1.default)(`semantic-release-github-milestones`);
    }
    return logger;
}
exports.getLogger = getLogger;
