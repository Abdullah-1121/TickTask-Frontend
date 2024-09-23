'use client'
import { useForm } from "react-hook-form";
import { FormDataNames } from "@/lib/types";
import FormField from "@/components/Formfield"
import {signUpSchema} from '@/lib/sign-up-scehma'
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";



function Form() {
 
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormDataNames>({
    resolver:zodResolver(signUpSchema)
  });
  

  const onSubmit = async (data: FormDataNames) => {
    
      try{
        const formData =  new FormData();
      
formData.append('username', data.username);
formData.append('email', data.email);
formData.append('password', data.password);
// formData.forEach((value, key) => {
//   console.log(key, value);
// });

const response = await fetch('http://localhost:8000/user/register', {
  method: 'POST',
  body: formData,
});

const result = await  response.json()
const message = result.message;
// console.log(message)
toast.success(`${message} , Log in to Continue`)
window.location.href = '/sign-in';




      }catch(error){
        toast.error('Something gone wrong , Please try again later')
    
      }
      
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className=" shadow-xl bg-gray-100 p-4 rounded-lg">
        <div className="grid col-auto space-y-3  p-2 m-2 ">
          <h1 className="text-3xl font-bold mb-4 text-center text-green-500">
            Sign Up 
          </h1>
          <FormField
            type="username"
            placeholder="Username"
            name="username"
            register={register}
            error={errors.username}
          />
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
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
          <div className="m-2 p-2  text-sm"><p>Alreaddy have an Account ? <Link href={'/sign-in'}><span className="underline text-green-500 font-semibold">Sign in</span></Link></p></div>
        </div>
      </form>
  );
}

export default Form;