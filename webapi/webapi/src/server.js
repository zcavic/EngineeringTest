"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const videoController_1 = __importDefault(require("./controllers/videoController"));
const consumer_1 = require("./workQueue/consumer");
const publisher_1 = require("./workQueue/publisher");
const app = new app_1.default([new videoController_1.default()], 5000, new consumer_1.Consumer(), new publisher_1.Publisher());
app.ready.then(() => console.log('Server is up and running.'));
