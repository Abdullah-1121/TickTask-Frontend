
import React from 'react'
import { todo } from '../../types'
import TaskTodo from "@/components/Todo"
import { revalidatePath } from 'next/cache'

const Table =async () => {
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8000/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache:'no-store'
      });
      revalidatePath('/todos')
      const data = await response.json();  // Wait for the JSON data to be parsed
      return data;  // Now you can return the data and store it in a variable
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const response = await fetchData()
  const data = response.sort((a:any,b:any)=>a.id - b.id)
  console.log(data)
  //  const data = await fetch('http://localhost:8000/todos')
  //  const todo_list = await data.json()
  //  const dummy=await fetch('http://localhost:8000/todos')
  //  const res = await dummy.json()
  //  console.log(res)
  //  console.log('All todos = ',todo_list)
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