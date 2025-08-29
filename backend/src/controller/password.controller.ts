import { NextFunction, Request, Response } from "express";
import { validateSchema } from "../middleware/validate.middleware";
import { RequestResetInput, requestResetSchema, ResetPasswordInput, resetPasswordSchema, VerifyOTPInput, verifyOTPSchema } from "../schemas/resetpw.schema";
import userRepository from "../repository/user.repository";
import { OTPService } from "../services/otp.service";
import emailService from "../services/email.service";
import { errorResponse } from "../helper/errorMessage";

class PasswordController {
   requestReset = [
      validateSchema(requestResetSchema),
      async(req: Request<{}, {}, RequestResetInput['body']>, res: Response, next: NextFunction) => {
         try{
            const {email} = req.body;

            const user = userRepository.findByEmail(email);

            if(!user){
               res.status(400).json({message: "Email not found"});
            }

            const otp = OTPService.generateOTP();

            OTPService.storeOTP(email, otp);

            const otpToken = OTPService.generateOTPToken({
               email,
               otp,
               purpose: 'password_reset'
            })

            //send email
            await emailService.sendOTPEmail(email, otp, (await user).fullName);

            res.status(200).json({
               message: 'OTP sent to email',
               token: otpToken,
            });
         } catch (error) {
            next(error);
         }
      }
   ];

   verifyOTP =[
      validateSchema(verifyOTPSchema),
      async (req: Request<{}, {}, VerifyOTPInput['body']>, res: Response, next: NextFunction) => {
         try{
            const {email, otp, token} = req.body;

            let isValid= false;
            if(token) {
               try{
                  const payload = OTPService.verifyOTPToken(token);
                  isValid = payload.otp === otp && payload.email === email;
               } catch {
                  isValid = false;
               }
            }
            if (!isValid) {
               throw new Error('Invalid or expired OTP');
            }

             // Generate reset token for password change
            const resetToken = OTPService.generateOTPToken({
               email,
               otp: 'verified', 
               purpose: 'password_reset',
            });

            res.status(200).json({
               message: 'OTP verified successfully',
               resetToken,
            });
            
         } catch (e) {
            errorResponse(e, res, "Invalid or expired OTP");
            next(e);
         }
      }
   ];

   resetPassword = [
      validateSchema(resetPasswordSchema),
      async (req: Request<{}, {}, ResetPasswordInput['body']>, res: Response, next: NextFunction) => {
         try {
            const {token, newPassword} = req.body;

            const payload = OTPService.verifyOTPToken(token);

            if (payload.purpose !== 'password_reset') {
               throw new Error('Invalid reset token');
            }

            const user = await userRepository.findByEmail(payload.email);
            if (!user) {
               throw new Error('User not found');
            }

            await userRepository.updatePassword(user.id,  newPassword);

            res.status(200).json({
               message: 'Password reset successfully',
            });

         } catch (e) {
            next(e);
         }
      }
   ]

}

export default new PasswordController();