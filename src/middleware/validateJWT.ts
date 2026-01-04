import  { type NextFunction, type Request,type Response } from "express"
import  Jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";

export interface ExtendRequest extends Request{
    user?: any
}


const validateJWT = async (req: ExtendRequest, res:Response ,next:NextFunction) => {
    
    const authorizationHeader = await req.get('authorization');
    if (!authorizationHeader) {
        res.status(403).send('authorization was not provided');
        return;

    }
    const token = authorizationHeader.split(" ")[1];

    if (!token) {

        res.status(403).send('token is not not');
        return;
    }

    Jwt.verify(token, "134ewqrqwerqw2123r12r2ASDFAS", async (err, payload) => {
        if (err) {
            res.status(403).send('invalid token');
        }
        if (!payload) {
            res.status(403).send('invalid token payload')
        }
        const userPayload = payload as { email: string, firstName: string, lastName: string };
        const user = await userModel.findOne({ email: userPayload.email });
        req.user = user;
        next();
    });




}

export default validateJWT;