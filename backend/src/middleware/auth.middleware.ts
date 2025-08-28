import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../helper/errorMessage";
import jwt from "jsonwebtoken"

export const verifyAccessToken = async(req: Request, res: Response, next: NextFunction) => {
   const token = req.header("Authorization")?.replace('Bearer', '');

   if(!token) return res.status(401).json({error: "Authentication Failed. Token not found"});

   try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;

      res.locals.user = decoded.user;
      next();

   } catch (e) {
      res.status(401).json({error: e instanceof Error? e: 'You are unauthorized to access the system' });
      next(e);
   }
};