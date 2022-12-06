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
exports.ProductController = void 0;
const connect_1 = __importDefault(require("../database/connect"));
const productsModel_1 = require("../models/productsModel");
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const productController = new productsModel_1.ProductSchema();
class ProductController {
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.file);
                const userId = req.user;
                const { title, price, image } = req.body;
                const product = yield productController.create(title, price, image, userId.id);
                console.log(product);
                res.status(200).json({
                    message: 'product created successfully'
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    resizeImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.file) {
                const filename = `category-${(0, uuid_1.v4)()}.jpeg`;
                yield (0, sharp_1.default)(req.file.buffer)
                    .resize(255, 1000)
                    .toFormat("jpeg")
                    .jpeg({ quality: 95 })
                    .toFile(`images${filename}`);
                req.body.image = filename;
            }
            next();
        });
    }
    getMyProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user;
                const Response = yield connect_1.default.execute(`select * from product where userId = '${userId.id}'`);
                const product = Response[0];
                if (!product)
                    return res.status(404).json({ message: 'you not have yet product ' });
                res.status(200).json(product);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const updateProduct = req.body;
            try {
                const Response = yield connect_1.default.query(`update product set ? where id = ? and userId = ? `, [updateProduct, req.params.id, userId.id]);
                if (Response[0].affectedRows < 1)
                    return res.status(404).json({ message: "Your are not allowed to perform this " });
                res.status(200).json({ message: 'your product updated successfully' });
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            try {
                const Response = yield connect_1.default.query(`delete from product  where id = ? and userId = ? `, [req.params.id, userId.id]);
                if (Response[0].affectedRows < 1)
                    return res.status(404).json({ message: "Your are not allowed to perform this " });
                res.status(200).json({ message: 'deleted successfully' });
            }
            catch (error) {
                res.send(error);
            }
        });
    }
}
exports.ProductController = ProductController;
