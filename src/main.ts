import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';

import pool from './database/connect'

import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute'

dotenv.config()


const port =process.env.PORT 
const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());




app.use('/api/users',userRoute)
app.use('/api/products',productRoute)


pool.getConnection().then(()=>{
  console.log('connected to database done successfully')
}).catch((err)=>console.log(err))


app.listen(port,()=>{
    console.log(`⚡️[server]: Server is  running  at https://localhost:${port}`);
})
