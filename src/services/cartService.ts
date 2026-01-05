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

interface ClearCart {
    userId: string;
}
export const ClearCartForUser = async ({ userId }: ClearCart) => {
    const cart = await getActiceCartForUser({ userId });
    
    cart.items = [];
    cart.totalamount = 0;

     const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 201 };


    
}



interface cartItems {
    productId: ObjectId | any,
    userId: string,
   
    quantity:number
}
  
export const addItemsToCart = async ({ productId, quantity, userId }: cartItems) => {
    // find active cart for user
    const cart = await getActiceCartForUser({ userId });

    const existsCart = cart.items.find((p) => p.product.toString() === productId);

    if (existsCart) {
        
        return { data: "item is aleardy exists in cart !", statusCode: 400 };

    }
    const product = await productModel.findById(productId);

    if (!product) {


        return { data: "product not found !", statusCode: 400 };
    }
     

    if (product.stock < quantity) {
        return { data: "product stock is not enough !", statusCode: 400 };
    }



    cart.items.push({
        product: productId, unitPrice: product.price, quantity: quantity
    });

    cart.totalamount += product.price * quantity;



    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 201 };

    
    
};
export const updateItemtoCart = async ({ productId, quantity, userId }: cartItems) => {
    const cart = await getActiceCartForUser({ userId });

    const existsCart = cart.items.find((p) => p.product.toString() === productId);

    if (!existsCart) {
        
        return { data: "item is not exists in cart !", statusCode: 400 };


    }

    const product = await productModel.findById(productId);

    if (!product) {


        return { data: "product not found !", statusCode: 400 };
    }
     

    if (product.stock < quantity) {
        return { data: "product stock is not enough !", statusCode: 400 };
    }
    
     
    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);

    let total = otherCartItems.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice;
        return sum;

    },0);

        existsCart.quantity = quantity;


    total += existsCart.quantity * existsCart.unitPrice;

    cart.totalamount = total;
     
    const updatedCart = await cart.save();
       return { data: updatedCart, statusCode: 200 };


 

};
interface deleteCartItems {
    productId: ObjectId | any,
    userId: string,
   
   
}

export const deleteItemFromCart = async ({ productId,  userId }: deleteCartItems) => {
    const cart = await getActiceCartForUser({ userId });

    const existsCart = cart.items.find((p) => p.product.toString() === productId);

    if (!existsCart) {
        
        return { data: "item is not exists in cart !", statusCode: 400 };


    }

    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);
    let total = otherCartItems.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice;
        return sum;

    }, 0);
    
    cart.items = otherCartItems;
    cart.totalamount = total;
        const updatedCart = await cart.save();
       return { data: updatedCart, statusCode: 200 };
}


