import { NextFunction, Request, Response } from "express";
import { validateSchema } from "../middleware/validate.middleware";
import { LoginUserInput, loginUserSchema, RegisterUserInput, registerUserSchema } from "../schemas/user.schema";
import userRepository from "../repository/user.repository";
import { errorResponse } from "../helper/errorMessage";
import { generateJwtToken } from "../utils/jwtToken";
import { AxiosResponse } from "axios";
import { verifyAccessToken } from "../middleware/auth.middleware";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken"


class AuthController{
   register = [
      validateSchema(registerUserSchema),
      async(req:Request<{}, {}, RegisterUserInput['body']>, res: Response, next: NextFunction): Promise<void> => {
         try {
            const userDto = req.body;

            if(userDto.password !== userDto.confirmPassword) {
               throw new Error("Password doesn't match");
            }

            const existingUser = await userRepository.findByEmail(userDto.email);
            if(existingUser) {
               throw new Error("Email already in use")
            };

            const userData = {
               fullName: userDto.fullName,
               email: userDto.email,
               password: userDto.password
            };

            const newUser = await userRepository.createUser(userData);

            const plainUser = newUser.get({ plain: true });
            const { password, ...userWithoutPassword } = plainUser;

            res.status(201).json(userWithoutPassword);
         } catch (e) {
            errorResponse(e, res, "Error while registering user");
            next(e);
         }
      }
   ];

   login = [
      validateSchema(loginUserSchema),
      async(req:Request<{}, {}, LoginUserInput['body']>, res: Response, next: NextFunction) => {
            try{
                const {email, password} = req.body;

                const user = await userRepository.findByEmailAndPassword(email, password);
                if (!user) {
                    return res.status(401).json({error : "Authentication failed"});
                }

                const accessToken = generateJwtToken({user}, '1h');
                
                res
                    .status(200)
                    .json({"message": "User logged in successfully", accessToken, id: user.id});  
            } catch (e) {
                errorResponse(e, res, "Invalid email or password");
                next(e);
            }
        }
    ];

    logout = [
      verifyAccessToken,
      async(req: Request, res: Response) => {
         const userId = req.body.userId;
         const token = req.header("Authorization")?.replace("Bearer ", "");

         res.json({ message: "Logged out" });
      }

    ]


}

export default new AuthController();