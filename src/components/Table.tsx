'use client'
// import React from 'react'
// import { todo } from '../../types'
// import TaskTodo from "@/components/Todo"
// import { revalidatePath } from 'next/cache'
// import { cookies } from 'next/headers'; 
// import Cookies from 'js-cookie'


// const cookieStore = cookies();
//  const token = cookieStore.get('access_token')?.value;

// // const token = Cookies.get('access_token');
// console.log(token)

// const Table =async () => {
//   async function fetchData() {
//     try {
//       const response = await fetch('http://localhost:8000/todos', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         cache:'no-store'
//       });
//       revalidatePath('/')
//       const data = response.json()
//       // console.log(data)
//       return data
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
//   const response = await fetchData()
//   // console.log(`This is the resposne from todos : ${response}`)
  
//   const data = response.sort((a:any,b:any)=>a.id - b.id)
 
//   // console.log('All Todos : '+ response)
//   return (
//     <table className='w-full mt-2'>
//       <thead className='w-full'>
//         <tr className='flex justify-between bg-gray-300 shadow-xl border-gray-300  w-full p-2'>
//           <th>Tasks</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {
//             data.map((todo:any)=>(
//             <TaskTodo task={todo} key = {todo.id}></TaskTodo>
//             ))
//         }
       
        
//       </tbody>
//     </table>
//   )
// }
// export default Table
// import { todo } from '../../types';
// import TaskTodo from "@/components/Todo";
// import { revalidatePath } from 'next/cache';
// import { cookies } from 'next/headers';

// const Table = async () => {
//   // Fetch todos from the server with fresh data every time
//   const fetchTodos = async () => {
//     const cookieStore = cookies();
//     const token = cookieStore.get('access_token')?.value;

//     try {
//       const response = await fetch('http://localhost:8000/todos', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         cache: 'no-store', // Ensures fresh data
//       });
//       const data = await response.json();
//       return data.sort((a: any, b: any) => a.id - b.id);
//     } catch (error) {
//       console.error('Error:', error);
//       return [];
//     }
//   };

//   const todos = await fetchTodos();
//   revalidatePath('/todos'); // Revalidate the todos path to ensure the right user data is fetched

//   return (
//     <table className='w-full mt-2'>
//       <thead className='w-full'>
//         <tr className='flex justify-between bg-gray-300 shadow-xl border-gray-300 w-full p-2'>
//           <th>Tasks</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {todos.length > 0 ? (
//           todos.map((todo: any) => (
//             <TaskTodo task={todo} key={todo.id}></TaskTodo>
//           ))
//         ) : (
//           <tr>
//             <td colSpan={2}>No tasks available.</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

// export default Table;

import React, { useEffect, useState } from 'react';
import { todo } from '../../types';
import TaskTodo from "@/components/Todo";
import Cookies from 'js-cookie';

const Table = () => {
  const [todos, setTodos] = useState<todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch fresh todos when component mounts or when the todos change
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const token =Cookies.get('access_token'); ;
      const response = await fetch('http://localhost:8000/todos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store', // Ensures fresh data
      });
      const data = await response.json();
      setTodos(data.sort((a: any, b: any) => a.id - b.id));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures it runs only on mount

  return (
    <table className='w-full mt-2'>
      <thead className='w-full'>
        <tr className='flex justify-between bg-gray-300 shadow-xl border-gray-300 w-full p-2'>
          <th>Tasks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {!isLoading && todos.length > 0 ? (
          todos.map((todo: any) => (
            <TaskTodo task={todo} key={todo.id}></TaskTodo>
          ))
        ) : (
          <tr>
            <td colSpan={2}>Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;

