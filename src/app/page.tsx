import Image from "next/image";
import Modal from '@/components/ui/modal'

import {Button} from '@/components/ui/button'
import Table from '@/components/Table'
export default function Home() {
  return (
     <div className="flex min-h-screen flex-col items-start justify-start p-24 bg-gray-100">
       <div className="Todo-heading w-full flex flex-col justify-center  border-2 mb-8">
        {/* Main Section with Heading and Add Task Button */}
        <h1 className="text-4xl font-bold text-green-600">TODO <span className="text-2xl text-gray-600 font-light">Your Daily Tasks Planner</span> </h1>
        <p className="text-sm text-gray-600">" Do what is supposed to be done. "</p>
       </div>
       <div className="Add-Task-Button border-2 w-full ">
         <Modal title='Add A New Task' edit={false} add={true}>
         <Button variant="outline" className = 'w-full bg-green-500 hover:bg-green-700 hover:text-white text-white font-bold py-2 px-4 rounded'> + Add Task</Button>
         </Modal>
           {/* All Tasks Table */}
           <Table/>
        
        
       </div>
       
     </div>
  );
}
