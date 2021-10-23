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
const body_parser_1 = __importDefault(require("body-parser"));
class App {
    constructor(controllers, port, consumer, publisher) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.consumer = consumer;
        this.publisher = publisher;
        // Object readiness design pattern
        this.ready = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield publisher.connect();
            yield consumer.connect();
            yield this.listen();
            resolve(undefined);
        }));
        this.app.set('views', './src/views');
        this.app.set('view engine', 'ejs');
        this.initializeMiddleware();
        this.initializeHomepage();
        this.initializeControllers(controllers);
    }
    initializeMiddleware() {
        this.app.use(body_parser_1.default.json());
        this.app.use('/start', this.publisher.publish);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    initializeHomepage() {
        this.app.get('/', (req, res) => {
            res.render('index');
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.listen(this.port, () => {
                console.log(`App listening on the port ${this.port}`);
            });
        });
    }
}
exports.default = App;
