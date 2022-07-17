"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubClient = void 0;
var create_client_1 = require("./create-client");
var client;
function getGithubClient(githubToken) {
    if (!client) {
        client = (0, create_client_1.createClient)(githubToken);
    }
    return client;
}
exports.getGithubClient = getGithubClient;
