import { z, ZodType } from "zod"; // Add new import
import {SignInTypes} from '@/lib/types'

 export const signInSchema: ZodType<SignInTypes> = z
  .object({
    username : z.string().min(3,'Username must be 3 characters long'),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    
  })
  
 