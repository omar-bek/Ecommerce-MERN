import dotenv from 'dotenv';


import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routers/userRoute.js';
import { seedProducts } from './services/productService.js';
import productRoute from './routers/productRoute.js';
import cartRoute from './routers/cartRoute.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

mongoose.connect(process.env.DB_URI || '')
  .then(() => {
    console.log('Connected to MongoDB');
    
  }).catch((err) => console.log("failed to coneect"));
  
//seed some products 
seedProducts();



app.use('/user', userRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);




    app.listen(PORT, () => {
          console.log(`Server is running on http://localhost:${PORT}`);
      });