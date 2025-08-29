import z from "zod";

export const requestResetSchema = z.object({
   body: z.object({
      email: z.string()
         .email("Invalid email address")
   })
});

export const verifyOTPSchema = z.object({
   body: z.object({
      email: z.string().email('Invalid email address'),
      otp: z.string().length(6, 'OTP must be 6 digits'),
      token: z.string().optional(),
   })
})

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string(), 
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
});


export type RequestResetInput = z.infer<typeof requestResetSchema>;
export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;