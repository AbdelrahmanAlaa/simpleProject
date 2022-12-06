'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserController = void 0;
const connect_1 = __importDefault(require('../database/connect'));
const bcrypt_1 = __importDefault(require('bcrypt'));
const userModel_1 = require('../models/userModel');
const generateToken_1 = __importDefault(require('../middleware/generateToken'));
const User = new userModel_1.createUser();
class UserController {
  createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { name, email, password, createAt } = req.body;
        const check = yield connect_1.default.execute(
          `select * from user where email = '${email}'`
        );
        if (check)
          return res.status(404).json({
            message: 'this email is already taken',
          });
        const user = yield User.create(name, email, password, createAt);
        return user;
      } catch (error) {
        console.log(error);
      }
    });
  }
  login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield connect_1.default.execute(
        `select * from user where email = '${req.body.email}'`
      );
      const user = response[0][0];
      if (!user)
        return res.status(400).json({
          message: 'incorrect in email or password',
        });
      const password = yield bcrypt_1.default.compare(req.body.password, user.password);
      if (!password)
        return res.status(400).json({
          message: 'incorrect in email or password',
        });
      const token = (0, generateToken_1.default)(user.id);
      res.status(200).json({ message: 'done', token });
    });
  }
  getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const user = connect_1.default.execute('select * from user', function (err, result) {
        if (err) {
          console.log(err);
        }
        res.status(200).json({
          message: 'success',
          data: result,
        });
      });
      return user;
    });
  }
  getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield connect_1.default.execute(
        `select * from user where id = ${req.params.id}`
      );
      const user = response[0][0];
      if (!user)
        return res.status(404).json({
          message: 'user id not found',
        });
      res.status(200).json(user);
    });
  }
}
exports.UserController = UserController;
