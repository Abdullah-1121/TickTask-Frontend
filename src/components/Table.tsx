
import React from 'react'
import { todo } from '../../types'
import TaskTodo from "@/components/Todo"
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'; 


const cookieStore = cookies();
const token = cookieStore.get('access_token')?.value;
// console.log(token)

const Table =async () => {
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8000/todos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        cache:'no-store'
      });
      revalidatePath('/todos')
      const data = response.json()
      // console.log(data)
      return data
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const response = await fetchData()
  // console.log(`This is the resposne from todos : ${response}`)
  
  const data = response.sort((a:any,b:any)=>a.id - b.id)
 
  // console.log('All Todos : '+ response)
  return (
    <table className='w-full mt-2'>
      <thead className='w-full'>
        <tr className='flex justify-between bg-gray-300 shadow-xl border-gray-300  w-full p-2'>
          <th>Tasks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            data.map((todo:any)=>(
            <TaskTodo task={todo} key = {todo.id}></TaskTodo>
            ))
        }
       
        
      </tbody>
    </table>
  )
}
export default Table

