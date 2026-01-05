import mongoose, { Schema, type ObjectId } from "mongoose"
import type { Product } from "./productModel.js"

const cartItemStatusEnum = ['active','complete']


export interface cartItems {
    product: Product,
    unitPrice: number,
    quantity:number
};
export interface Cart extends Document{
    userId: ObjectId | string,
    items: cartItems[],
    totalamount: number,
    status:"active"|"complete"
};

const cartItemSchema = new Schema<cartItems>({

    product: { type: Schema.Types.ObjectId, ref: "products", required: true },
    unitPrice: { type: Number, required: true ,default:1 },
    quantity: { type: Number, required: true }

});

const cartSchema = new Schema<Cart>({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    items: [cartItemSchema],
    totalamount: { type: Number, required: true },
    status:{type:String,enum:cartItemStatusEnum,default:"active"}
});

export const cartModel = mongoose.model<Cart>('cart', cartSchema);
