import { z, ZodType } from "zod"; // Add new import
import {FormDataNames} from '@/lib/types'

 export const signUpSchema: ZodType<FormDataNames> = z
  .object({
    username : z.string().min(3,'Username must be 3 characters long'),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    
  })
  
 