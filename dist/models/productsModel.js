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
exports.ProductSchema = void 0;
const connect_1 = __importDefault(require("../database/connect"));
class ProductSchema {
    create(title, price, image, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(userId);
                let sql = `
        INSERT INTO product (title,price,image,userId)
        VALUES(
            '${title}',
            '${price}',
            '${image}',
            '${userId}'
        )
        `;
                const createProduct = yield connect_1.default.execute(sql);
                return createProduct;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `select * from product where id='${id}'`;
            const findUser = yield connect_1.default.execute(sql);
            return findUser;
        });
    }
}
exports.ProductSchema = ProductSchema;
