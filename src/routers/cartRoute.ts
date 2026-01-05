import express from "express"
import { addItemsToCart, ClearCartForUser, deleteItemFromCart, getActiceCartForUser, updateItemtoCart } from "../services/cartService.js";
import validateJWT, { type ExtendRequest } from "../middleware/validateJWT.js";
 

const router = express.Router();


router.get('/',validateJWT,  async (req: ExtendRequest , res) => {
    // get user cart 
    const userId = req.user._id;
    const cart = await getActiceCartForUser({ userId});
    res.status(200).send(cart);

});
router.delete('/', validateJWT, async (req: ExtendRequest, res) => {
        const userId = req?.user?._id;
    const response = await ClearCartForUser({ userId });
     res.status(response.statusCode).send(response.data);
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


export default router;
