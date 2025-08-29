import { Router } from "express";
import authController from "../controller/auth.controller";
import passwordController from "../controller/password.controller";

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

authRouter.post('/request-reset', passwordController.requestReset);
authRouter.post('/verify-otp', passwordController.verifyOTP);
authRouter.post('/reset-password', passwordController.resetPassword);


export default authRouter;