import mongoose, { Schema } from "mongoose";

export interface User extends Document {
    
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    
}

const userSchema = new Schema<User>({
    firstName:{type:String , required:true},
    lastName:{type:String , required:true},
    email:{type:String , required:true},
    password:{type:String , required:true}
})
const userModel = mongoose.model<User>('user', userSchema);
export default userModel;