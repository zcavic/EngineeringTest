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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveVideo = void 0;
const mongoose_1 = require("mongoose");
function saveVideo(video) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = new mongoose_1.Schema({
            title: { type: String, required: true },
            status: { type: String, required: true },
        });
        const VideoModel = (0, mongoose_1.model)('IVideo', schema);
        // 4. Connect to MongoDB
        yield (0, mongoose_1.connect)('mongodb://localhost:27017/test');
        const doc = new VideoModel({
            title: video.title,
            status: video.status,
        });
        yield doc.save();
        console.log(doc.title);
    });
}
exports.saveVideo = saveVideo;
