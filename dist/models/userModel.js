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
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const connect_1 = __importDefault(require("../database/connect"));
class createUser {
    create(name, email, password, createdAt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let d = new Date();
                let yyyy = d.getFullYear();
                let mm = d.getMonth();
                let dd = d.getDate();
                let createAt = `${yyyy}-${mm}-${dd}`;
                const passwordHashed = yield bcrypt_1.default.hash(password, 10);
                let sql = `INSERT INTO  user (
        name,
        email,
        password,
        createdAt
    )VALUES ("${name}","${email}","${passwordHashed}","${createAt}")`;
                const createUser = yield connect_1.default.execute(sql);
                return createUser;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.createUser = createUser;
