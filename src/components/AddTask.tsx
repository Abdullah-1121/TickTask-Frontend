'use client'

import { addTodo } from '@/actions/actions'
import {useState , useEffect , useRef} from 'react'
import React from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import Submitbtn from '@/components/Submitbtn'

const addTask = () => {
  const ref = useRef<HTMLFormElement>(null)
  
  const [state , formAction] = useFormState(addTodo , {status :" " , message :" "})
  const {status , message}= state;
  useEffect(()=>{
    if (status == 'success'){
    ref.current?.reset()
    toast.success(message)
    }else if(status == 'error'){
      toast.error(message)
    }

  },[state])
  
  return (
    <form className='flex flex-col gap-4 w-full ' ref = {ref} action={formAction} name ='add_todo'>
        <input type="text" placeholder='Add Task' minLength={3} maxLength={54} required
         className='w-full p-2 border border-gray-400 rounded-md' name='add_todo' />
       <Submitbtn></Submitbtn>
    </form>
  )
}

export default addTask