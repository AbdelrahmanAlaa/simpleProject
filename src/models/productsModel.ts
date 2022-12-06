import pool from '../database/connect';

export class ProductSchema {
  async create(title: string, price: number, image: string, userId: any) {
    try {
      const sql = `
        INSERT INTO product (title,price,image,userId)
        VALUES(
            '${title}',
            '${price}',
            '${image}',
            '${userId}'
        )
        `;

      const createProduct = await pool.execute(sql);
      return createProduct;
    } catch (error) {
      console.log(error);
    }
  }
}
