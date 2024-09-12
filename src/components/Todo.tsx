'use client'
import React, { ReactNode, useEffect } from 'react'
import {todo} from '../../types'
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaRegSquareCheck } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import ToolTip from "@/components/Tooltip"
import Modal from "@/components/ui/modal"
import { useFormState } from 'react-dom';
import { change_status, del_todo } from '@/actions/actions';
import toast from 'react-hot-toast';

const Todo = ({task}:{task:any}) => {

  
  const handleStatusChange =async ()=>{
    const response = await change_status(
      task.id,
      task.content,
      task.is_completed
    )
  }
  const handleDel = async ()=>{
    const response = await del_todo(
      task.id,
      task.content,
      task.is_completed
    )
  }
  // useEffect(()=>{
  //   if (status == 'success'){
   
  //   toast.success(message)
  //   }else if(status == 'error'){
  //     toast.error(message)
  //   }

  // },[state])
  
  return (
    <tr className='flex justify-between items-center space-x-3 '>

        <td className='m-2 flex space-x-2 justify-center items-center'>
          <button onClick={handleStatusChange}>
          <ToolTip tool_tip='Mark as Completed'>
          < FaRegSquareCheck size={24}  className={`${task.is_completed ? "text-black" : "text-gray-200"}`}/></ToolTip>
          </button>
         {task.content}</td>
        <td className='icons flex space-x-3'>
        <ToolTip tool_tip='Edit Task'><Modal title='Edit Task' add={false} edit={true} task = {task}><FiEdit3 size={24} className='text-green-500' /></Modal></ToolTip>
        <button onClick={handleDel}><ToolTip tool_tip='Delete Task'><IoIosRemoveCircleOutline size={24} className='text-red-500'/></ToolTip>
        </button>

        </td>
    </tr>
  )
}

export default Todo