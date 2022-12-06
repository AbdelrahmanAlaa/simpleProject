import { Router } from "express";


import { ProductController } from "../controller/productController";
import {userAuth} from '../controller/authUserController'
import { UploadImage } from "../middleware/multer";
import { createSchema ,updateSchema } from "../middleware/validation/productValidator";
import { validateRequest } from "../middleware/validateRequest";

const productRoute = Router()


const productController = new ProductController()
const uploadImage = new UploadImage()

productRoute.route('/').
post(
uploadImage.singleImage('image'),
productController.resizeImage,
validateRequest(createSchema),
userAuth,
productController.createProduct
)
.get( 
userAuth,
productController.getMyProduct
 )

productRoute.route('/:id')
.patch(
validateRequest(updateSchema),
  userAuth,
  productController.updateProduct
  ).delete(userAuth,productController.deleteProduct)

export default productRoute

