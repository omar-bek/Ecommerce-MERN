import type { ObjectId } from "mongoose";
import { cartModel } from "../models/cartModel.js";
import type { Product } from "../models/productModel.js";
import productModel from "../models/productModel.js";


 interface CartDto {
        userId:  string,
   
};

const createCartForUser = async ({userId}:CartDto) => {
    const cart = await cartModel.create({ userId ,totalamount:0});  
    await cart.save();
    return cart;

};

interface GetActiveCart{
    userId : string;
}

export const getActiceCartForUser = async ({userId}:GetActiveCart) => {
    let cart = await cartModel.findOne({ userId,status:"active" });
    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return cart;
};

interface cartItems {
    productId: ObjectId | any,
    userId: string,
   
    quantity:string
}
  
export const addItemsToCart = async ({ productId, quantity,userId }: cartItems) => {
    // find active cart for user
    const cart = await getActiceCartForUser({ userId });

    const existsCart = cart.items.find((p) => p.product.toString() === productId);

    if (existsCart) {
        
        return { data: "item is aleardy exists in cart !", statusCode: 400 };

    }
    const product = await productModel.findById( productId );

    if (!product) {


       return { data: "product not found !", statusCode: 400 };
    }
     

    if( product.stock < parseInt(quantity)) {
        return { data: "product stock is not enough !", statusCode: 400 };
    }



    cart.items.push({
        product: productId, unitPrice: product.price, quantity: parseInt(quantity) 
    });

    cart.totalamount += product.price * parseInt(quantity);



    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 201 };
    
}


