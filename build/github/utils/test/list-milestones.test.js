"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const nock_1 = __importDefault(require("nock"));
const create_client_1 = require("../../client/create-client");
const list_milestones_1 = require("../list-milestones");
const fake_milestones_1 = require("./fixtures/fake-milestones");
ava_1.default.afterEach.always(() => {
    // Clear nock
    nock_1.default.cleanAll();
});
(0, ava_1.default)('listMilestones', async (t) => {
    const client = (0, create_client_1.createClient)('token');
    (0, nock_1.default)('https://api.github.com')
        .get('/repos/owner1/repo1/milestones')
        .reply(200, fake_milestones_1.FAKE_MILESTONES);
    const result = await (0, list_milestones_1.listMilestones)(client, 'repo1', 'owner1');
    t.is(result.length, 2);
});
