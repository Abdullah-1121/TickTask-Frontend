
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import AddTask from '@/components/AddTask'
import EditTask from '@/components/EditTask'

export default  function modal ({children , title , add , edit ,task}:{children:React.ReactNode , title:string , add:boolean , edit:boolean , task?:any}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
       
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {add && <AddTask/>}
          {edit && <EditTask todo = {task}/>}
        </DialogHeader>
        
       
      </DialogContent>
    </Dialog>
  )
}
