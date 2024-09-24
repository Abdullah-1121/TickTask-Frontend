'use client'
import React from 'react'
import {useState , useEffect } from 'react'
import { useFormState } from 'react-dom'
import {edit_todo} from '@/actions/actions'
import Submitbtn from '@/components/Submitbtn'
import toast from 'react-hot-toast'


const EditTask = ({todo}:{todo:any}) => {
  const [state , formAction] = useFormState(edit_todo , {status :" " , message :" "})
  const {status , message}= state;
  const handleSubmit = (formData:FormData)=>{
    const id : number = todo.id;
    const content : string = formData.get('edit_task') as string;
    const is_completed : boolean = todo.is_completed;
    formAction({id,content,is_completed})
  }
  useEffect(()=>{
    if (status == 'success'){
    
    toast.success(message)
    }else if(status == 'error'){
      toast.error(message)
    }

  },[state])
  return (
    <form className='flex flex-col gap-4 w-full ' action={handleSubmit} >
        <input type="text"  minLength={3} maxLength={54} defaultValue={todo.content} required
         className='w-full p-2 border border-gray-400 rounded-md' name='edit_task' />
       <Submitbtn/>
    </form>
  )
}

export default EditTask