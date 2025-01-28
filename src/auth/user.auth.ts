import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyJwtToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const id_token = req?.headers['id_token']as (string | undefined)
        if(!id_token){
            res.status(401).json({message: "No id_token"})
        }
        var decoded = jwt.verify(id_token!, process.env.JWT_SECRET!)
        req.headers['user_id'] = JSON.parse(JSON.stringify(decoded)).user_id
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error})
    }
}