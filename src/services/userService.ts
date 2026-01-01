import userModel from "../models/userModel.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface registerParams {
       firstName: string;
    lastName: string;
    email: string;
    password: string;
}


export const register = async ({firstName,lastName,email,password}: registerParams) => {
    const findUser = await userModel.findOne({email});

    if (findUser) {
        return { data: "user already exits", statusCode: 400 };
    }
    const hashPassword = await bycrypt.hash(password, 10);
    const newUser = new userModel({ email, password:hashPassword, firstName, lastName })
    await newUser.save();
    return {data: generateJwt({firstName,lastName,email}),statusCode:200};

    
}

interface LoginDto {
     email: string;
    password: string;
}
export const login = async ({email,password}: LoginDto) => {
    const findUser = await userModel.findOne({email});
    if (!findUser) {
        return {
            data: "login failed" , statusCOde:400 }
        }
    
    const passwordMatch = await bycrypt.compare(password, findUser.password);
        if(passwordMatch) {
            return {
            data: generateJwt({email,firstName: findUser.firstName ,lastName: findUser.lastName}) , statusCOde:200 }
        }
        return {
            data: "password incorrect" , statusCOde:400 }
    }
    
const generateJwt = (data:any) => {
    return jwt.sign(data, "134ewqrqwerqw2123r12r2ASDFAS");
    } 
