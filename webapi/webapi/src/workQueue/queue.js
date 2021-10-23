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
exports.Queue = void 0;
const amqp_connection_manager_1 = __importDefault(require("amqp-connection-manager"));
class Queue {
    constructor() {
        this.connections = [];
        this.channels = [];
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Trying to connect.');
                const connection = amqp_connection_manager_1.default.connect(['amqp://rabbitmq']);
                //const connection = amqpConMgr.connect([process.env.MESSAGE_QUEUE]);
                console.log('Trying to create chanel.');
                const channel = yield connection.createChannel();
                console.log('Trying to assert queue.');
                yield channel.assertQueue('jobs');
                this.connections.push(connection);
                this.channels.push(channel);
                console.log('Connected.');
            }
            catch (ex) {
                console.error(ex);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const connection of this.connections) {
                    yield connection.close();
                }
                for (const channel of this.channels) {
                    yield channel.close();
                }
                console.log('Chanel and channel are closed.');
            }
            catch (ex) {
                console.error(ex);
            }
        });
    }
}
exports.Queue = Queue;
