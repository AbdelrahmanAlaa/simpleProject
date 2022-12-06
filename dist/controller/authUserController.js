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
exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connect_1 = __importDefault(require("../database/connect"));
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token;
    //   check token is send to headers
    if (((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith('Bearer')) && req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({
            message: 'access denied , no token provided'
        });
    }
    // verify token (no change or expired )
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
    }
    catch (err) {
        return res.status(401).json({ message: "invalid token or expired" });
    }
    // checkUser  if user exists 
    const response = yield connect_1.default.execute(`select * from user where id = '${decoded}'`);
    const checkUser = response[0][0];
    if (!checkUser) {
        return res
            .status(401)
            .json({ message: "this user not be longe available" });
    }
    req.user = checkUser;
    next();
});
exports.userAuth = userAuth;
