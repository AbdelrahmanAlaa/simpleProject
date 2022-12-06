import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

import { ProductSchema } from '../models/productsModel';
import pool from '../database/connect';

const productController = new ProductSchema();

export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      console.log(req.file);
      const userId: any = req.user;
      const { title, price, image } = req.body;
      const product = await productController.create(title, price, image, userId.id);
      console.log(product);
      res.status(200).json({
        message: 'product created successfully',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async resizeImage(req: Request, res: Response, next: NextFunction) {
    if (req.file) {
      const filename = `product-${uuidv4()}.jpeg`;
      await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`images${filename}`);

      req.body.image = filename;
    }
    next();
  }

  async getMyProduct(req: Request, res: Response) {
    try {
      const userId: any = req.user;
      const Response: any = await pool.execute(
        `select * from product where userId = '${userId.id}'`
      );

      const product = Response[0];

      if (!product) return res.status(404).json({ message: 'you not have yet product ' });
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(req: Request, res: Response) {
    const userId: any = req.user;
    const updateProduct = req.body;

    try {
      const Response: any = await pool.query(`update product set ? where id = ? and userId = ? `, [
        updateProduct,
        req.params.id,
        userId.id,
      ]);
      if (Response[0].affectedRows < 1)
        return res.status(404).json({ message: 'Your are not allowed to perform this ' });

      res.status(200).json({ message: 'your product updated successfully' });
    } catch (error) {
      res.send(error);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const userId: any = req.user;

    try {
      const Response: any = await pool.query(`delete from product  where id = ? and userId = ? `, [
        req.params.id,
        userId.id,
      ]);
      if (Response[0].affectedRows < 1)
        return res.status(404).json({ message: 'Your are not allowed to perform this ' });

      res.status(200).json({ message: 'deleted successfully' });
    } catch (error) {
      res.send(error);
    }
  }
}
