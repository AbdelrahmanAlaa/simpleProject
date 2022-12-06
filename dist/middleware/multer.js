"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
class UploadImage {
    singleImage(filedName) {
        const multerStorage = multer_1.default.memoryStorage();
        console.log(filedName);
        const upload = (0, multer_1.default)({ storage: multerStorage });
        return upload.single(filedName);
    }
}
exports.UploadImage = UploadImage;
