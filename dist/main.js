"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("./database/connect"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.static("images"));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
const port = process.env.PORT;
app.use('/api/users', userRoute_1.default);
app.use('/api/products', productRoute_1.default);
connect_1.default.getConnection().then(() => {
    console.log('connected to database done successfully');
}).catch((err) => console.log(err));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is  running  at https://localhost:${port}`);
});
