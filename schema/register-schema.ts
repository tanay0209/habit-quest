import { z } from 'zod'

const registerSchema = z.object({
    username: z.string().min(1, "Username is required").max(20, "Username cannot exceed 20 characters"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password should be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password should be at least 8 characters"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export default registerSchema;
