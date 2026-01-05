import mongoose, { Schema, type ObjectId } from "mongoose";
 
export interface IOrderItems {
    productTitle: string;
    productImage: string;
    productPrice: number;
    quantity: number;

};

const orderItemsSchema = new Schema<IOrderItems>({

    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    productPrice: { type: Number, required: true },
    quantity:{type:Number , required:true}

});

export interface Order extends Document {
    orderItems: IOrderItems[],
    address: string,
    total: number,
    userId :string | ObjectId

};

const OrderSchema = new Schema<Order>({
    orderItems: [orderItemsSchema],
    address: { type: String, required: true },
    total: { type: Number, required: true },
    userId:{type:Schema.Types.ObjectId, required:true}

})

export const  orderModel = mongoose.model<Order>('order', OrderSchema);