'use server'
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers';
const cookieStore = cookies();
const token = cookieStore.get('access_token')?.value;
const ref_token = cookieStore.get('refresh_token')?.value;
console.log(token)
export async function addTodo(state :{status:string , message : string},formData : FormData){
    const todo_content = formData.get('add_todo') as string;
    // console.log('form data = ',formData)
    // console.log('todo - content',todo_content)
    
    try{
        const response = await fetch('http://localhost:8000/todos',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({content:todo_content})
        })
        if(response.ok){
            revalidatePath('/')
            return {status : 'success' , message : 'Todo Added Successfully'}

        }else{
            return {status : 'error' , message : 'Error while adding todo'}
        }
        
      

    }catch(error){
        return {status : 'error' , message : 'Error while adding todo'}
    }

}

//Edit todo 
export async function edit_todo(state :{status:string , message : string},{id,content,is_completed}:{id:number,content:string,is_completed:boolean}){
    // const todo_content = formData.get('edit_task') as string;
    // console.log('form data = ',formData)
    // console.log('todo - content',todo_content)
    
    try{
        const response = await fetch(`http://localhost:8000/todos/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({id:id , content : content , is_completed : is_completed})
        })
        if(response.ok){
            revalidatePath('/')
            return {status : 'success' , message : 'Todo Edited Successfully'}

        }else{
            return {status : 'error' , message : 'Error while editing todo'}
        }
        
      

    }catch(error){
        return {status : 'error' , message : 'Error while adding todo'}
    }

}

//Delete functionality
export async function del_todo(id:number,content:string,is_completed:boolean){
   
    
    try{
        const response = await fetch(`http://localhost:8000/todos/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({ content : content , is_completed : ! is_completed})
        })
        if(response.ok){
            revalidatePath('/todos')
            return {status : 'success' , message : `Todo Deleted successfully`}

        }else{
            return {status : 'error' , message : 'Error while deleting todo'}
        }
        
      

    }catch(error){
        return {status : 'error' , message : 'Error while deleting todo todo'}
    }

}


// Change Status Funcitonality
export async function change_status(id:number,content:string,is_completed:boolean){
   
    
    try{
        const response = await fetch(`http://localhost:8000/todos/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({ content : content , is_completed : ! is_completed})
        })
        if(response.ok){
            revalidatePath('/todos')
            return {status : 'success' , message : `Status Changed`}

        }else{
            return {status : 'error' , message : 'Error while editing todo'}
        }
        
      

    }catch(error){
        return {status : 'error' , message : 'Error while changing status of  todo'}
    }

}

