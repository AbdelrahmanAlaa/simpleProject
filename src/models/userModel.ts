import bcrypt from 'bcrypt';
import pool from '../database/connect';
export class createUser {
  async create(name: string, email: string, password: string, createdAt: Date) {
    try {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = d.getMonth();
      const dd = d.getDate();

      const createAt = `${yyyy}-${mm}-${dd}`;
      const passwordHashed = await bcrypt.hash(password, 10);

      const sql = `INSERT INTO  user (
        name,
        email,
        password,
        createdAt
    )VALUES ("${name}","${email}","${passwordHashed}","${createAt}")`;

      const createUser = await pool.execute(sql);
      return createUser;
    } catch (error) {
      console.log(error);
    }
  }
}
