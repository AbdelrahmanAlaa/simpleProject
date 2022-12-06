import { UserController } from "../controller/userController";
import { Router } from "express";

import {userAuth} from '../controller/authUserController'
import {validateRequest} from '../middleware/validateRequest'
import { registerSchema,loginSchema } from "../middleware/validation/userValidator";

const userRoute = Router()
const userController = new UserController()


userRoute.route('/').post(validateRequest(registerSchema),userController.createUser).get(userController.getUsers)

userRoute.route('/login').post(validateRequest(loginSchema),userController.login)
userRoute.route('/:id').get(userAuth,userController.getUserById)

export default userRoute;