import express from 'express';
import { creatProduct, getAllProduct } from '../services/productService.js';


const router = express.Router();


router.get('/', async (req, res) => {
    
    const data = await getAllProduct();
    res.status(200).send(data);

});

router.post('/', async (req, res) => {
    const data = req.body;
    const newProduct = await creatProduct(data);
    res.status(201).send(newProduct);
})

export default router;