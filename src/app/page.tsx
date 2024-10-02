// 'use client'
import Image from "next/image";
import Modal from '@/components/ui/modal'
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import {Button} from '@/components/ui/button'
import Table from '@/components/Table'
import getUsernameFromToken from "@/lib/getUsername";
import Logout from '@/components/logout'
import {cookies} from 'next/headers'
import Cookies from "js-cookie";
export default async function  Home() {
  
  const cookieStore = cookies();
  const token : any = cookieStore.get('access_token')?.value;
  const secret : any = process.env.SECRET_KEY;
  
  
  const username = await getUsernameFromToken(token , secret)
  console.log(username)
  return (
     <div className="flex min-h-screen flex-col items-start justify-start p-8 bg-gray-100">
      <div className="flex w-full p-2  mb-4 justify-between ">
        <div className="px-16 flex w-full justify-between "> 
        <div className="user-profile flex justify-center items-center"><CiUser /> <span className="mx-2 text-sm text-gray-600 font-semibold">Hi , {username}</span></div>
        <div className="logout-button flex justify-center items-center "><IoIosLogOut /> <span className="mx-2 text-sm text-gray-600 font-semibold hover:text-green-500"><Logout/></span></div>
        </div>
        
      </div>
       <div className="Todo-heading w-full flex flex-col justify-center px-16  mt-4 mb-8">
        {/* Main Section with Heading and Add Task Button */}
        <h1 className="text-4xl font-bold text-green-600">TICK TASK <span className="text-2xl text-gray-600 font-light">Your Daily Tasks Planner</span> </h1>
        <p className="text-sm text-gray-600">Do what is supposed to be done. </p>
       </div>
       <div className="Add-Task-Button  w-full px-16 ">
         <Modal title='Add A New Task' edit={false} add={true} >
         <Button variant="outline" className = 'w-full bg-green-500 hover:bg-green-700 hover:text-white text-white font-bold py-2 px-4 rounded'> + Add Task</Button>
         </Modal>
           {/* All Tasks Table */}
           <Table/>
        
        
       </div>
       
     </div>
  );
}
// import React, { useEffect, useState } from 'react';
// import Image from "next/image";
// import Modal from '@/components/ui/modal';
// import { CiUser } from "react-icons/ci";
// import { IoIosLogOut } from "react-icons/io";
// import { Button } from '@/components/ui/button';
// import Table from '@/components/Table';
// import getUsernameFromToken from "@/lib/getUsername";
// import Logout from '@/components/logout';
// import Cookies from "js-cookie";

// const Home = () => {
//   const [username, setUsername] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsername = async () => {
//       const token = Cookies.get('access_token'); // Access token from the cookie
//       const secret = process.env.SECRET_KEY; // Ensure using NEXT_PUBLIC for env in the client side
      
//       if (token && secret) {
//         try {
//           const fetchedUsername : any = await getUsernameFromToken(token, secret);
//           setUsername(fetchedUsername); // Set the username in state
//         } catch (error) {
//           console.error('Error fetching username:', error);
//         }
//       }
//     };

//     fetchUsername(); // Fetch the username when the component mounts
//   }, []); // Empty dependency array to run only on mount

//   return (
//     <div className="flex min-h-screen flex-col items-start justify-start p-8 bg-gray-100">
//       <div className="flex w-full p-2 mb-4 justify-between">
//         <div className="px-16 flex w-full justify-between">
//           <div className="user-profile flex justify-center items-center">
//             <CiUser /> 
//             <span className="mx-2 text-sm text-gray-600 font-semibold">
//               Hi, {username ? username : 'Guest'}
//             </span>
//           </div>
//           <div className="logout-button flex justify-center items-center">
//             <IoIosLogOut /> 
//             <span className="mx-2 text-sm text-gray-600 font-semibold hover:text-green-500">
//               <Logout />
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="Todo-heading w-full flex flex-col justify-center px-16 mt-4 mb-8">
//         {/* Main Section with Heading and Add Task Button */}
//         <h1 className="text-4xl font-bold text-green-600">
//           TICK TASK 
//           <span className="text-2xl text-gray-600 font-light">Your Daily Tasks Planner</span>
//         </h1>
//         <p className="text-sm text-gray-600">Do what is supposed to be done.</p>
//       </div>

//       <div className="Add-Task-Button w-full px-16">
//         <Modal title='Add A New Task' edit={false} add={true}>
//           <Button variant="outline" className='w-full bg-green-500 hover:bg-green-700 hover:text-white text-white font-bold py-2 px-4 rounded'>
//             + Add Task
//           </Button>
//         </Modal>
//         {/* All Tasks Table */}
//         <Table />
//       </div>
//     </div>
//   );
// };

// export default Home;

