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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class VideoController {
    constructor() {
        this.router = express_1.default.Router();
        this.video = [
            {
                title: 'Pulp Fiction',
                status: 'Uploaded',
            },
        ];
        this.getAllVideos = (request, response) => {
            response.send(this.video);
        };
        this.getStatus = (request, response) => {
            response.send(this.video);
        };
        this.uploadVideo = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('Try to upload video.');
            const video = { title: 'Pulp Fiction', status: 'Uploaded' };
            this.video.push(video);
            console.log('Video is uploaded. Try to update response.');
            response.send(video);
            console.log('Response updated. Try to call next middleware.');
            next();
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/files', this.getAllVideos);
        this.router.get('/files/:fileId/status', this.getStatus);
        this.router.post('/start', this.uploadVideo);
    }
}
exports.default = VideoController;
