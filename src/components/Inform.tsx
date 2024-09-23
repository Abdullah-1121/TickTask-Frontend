'use client'
import { useForm } from "react-hook-form";
import { signInNames , SignInTypes } from "@/lib/types";
import FormField from "./InFormField";

import { signInSchema } from "@/lib/sing-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";



function Form() {
 
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInTypes>({
    resolver:zodResolver(signInSchema)
  });
  

  const onSubmit = async (data: SignInTypes) => {
    
      try{
        const formData =  new FormData();
      
formData.append('username', data.username);
formData.append('password', data.password);
// formData.forEach((value, key) => {
//   console.log(key, value);
// });

const response = await fetch('http://localhost:8000/token', {
  method: 'POST',
  body: formData,
});

const result = await  response.json()
const access_token = result.access_token;
const refresh_token = result.refresh_token;
// Storing these tokens to local Storage so we can get them in any part of our application
document.cookie = `access_token=${access_token}; path=/;`;
document.cookie = `refresh_token=${refresh_token}; path=/;`;
// console.log(result)
toast.success('Welcome to Tick Task')
window.location.href= '/'
// const message = result.message;
// toast.success(message)





      }catch(error){
        toast.error('Something gone wrong , Please try again later')
    
      }
      
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className=" shadow-xl bg-gray-100 p-4 rounded-lg">
        <div className="grid col-auto space-y-3  p-2 m-2 ">
          <h1 className="text-3xl font-bold mb-4 text-center text-green-500">
            Sign In 
          </h1>
          <FormField
            type="username"
            placeholder="Username"
            name="username"
            register={register}
            error={errors.username}
          />
        <FormField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />
          <div className="flex justify-center items-center">
            
          <button type="submit" className="submit-button w-[80%] p-2 mt-4 rounded-lg text-white font-bold bg-green-500">
            Submit
          </button></div>
          <div className="m-2 p-2  text-sm"><p>Don't have an Account ? <Link href={'/sign-up'}><span className="underline text-green-500 font-semibold">Sign up</span></Link></p></div>
        </div>
      </form>
  );
}

export default Form;