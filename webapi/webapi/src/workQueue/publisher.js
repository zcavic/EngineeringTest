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
exports.Publisher = void 0;
const queue_1 = require("./queue");
class Publisher extends queue_1.Queue {
    publish(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Trying to sent into queue.');
                const video = { title: 'Pulp Fiction', status: 'Uploaded' };
                yield this.channels[0].sendToQueue('jobs', Buffer.from(JSON.stringify(video)));
                console.log(`Job sent successfully ${JSON.stringify(video)}`);
                next();
            }
            catch (ex) {
                console.error(ex);
            }
        });
    }
}
exports.Publisher = Publisher;
