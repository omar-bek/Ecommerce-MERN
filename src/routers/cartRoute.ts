import express from "express"
import { addItemsToCart, checkout, ClearCartForUser, deleteItemFromCart, getActiceCartForUser, updateItemtoCart } from "../services/cartService.js";
import validateJWT, { type ExtendRequest } from "../middleware/validateJWT.js";
 

const router = express.Router();


router.get('/',validateJWT,  async (req: ExtendRequest , res) => {
    // get user cart 
    try {
            const userId = req.user._id;
    const cart = await getActiceCartForUser({ userId});
    res.status(200).send(cart);
    } catch (error) {
        return res.status(500).send('internal server error');
    }


});
router.delete('/', validateJWT, async (req: ExtendRequest, res) => {
    try {
          const userId = req?.user?._id;
    const response = await ClearCartForUser({ userId });
     res.status(response.statusCode).send(response.data);
    } catch (error) {
        return res.status(500).send('internal server error');
    }
      
 });

router.post('/item', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await addItemsToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);


});

router.put('/item', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateItemtoCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);

});
router.delete('/item/:productId', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const { productId } = req.params;
   
    const response = await deleteItemFromCart({ userId, productId });
    res.status(response.statusCode).send(response.data);
});

router.post('/checkout', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const { address } = req.body;
    const response = await checkout({ userId,address });
    res.status(response.statusCode).send(response.data);


});




export default router;
