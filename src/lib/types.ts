import { FieldError, UseFormRegister } from "react-hook-form";

export type FormDataNames = {
    username:string;
    email: string;
    password: string;
    
  };
  export type SignInTypes = {
    username : string,
    password:string
  }
  export type InFieldProps = {
    type: string;
    placeholder: string;
    name: signInNames;
    register: UseFormRegister<SignInTypes>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;

  }
  export type signInNames =
  | "username"
  | "password"
  

  export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormDataNames>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
  };


  export type ValidFieldNames =
  | "username"
  | "email"
  | "password"
 