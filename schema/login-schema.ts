import { z } from "zod"

const loginSchema = z.object({
    userId: z.string().min(1, "User id is required"),
    password: z.string().min(8, "Should be min 8 characters")
})

export default loginSchema