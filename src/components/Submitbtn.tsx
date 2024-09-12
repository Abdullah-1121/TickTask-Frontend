import { useFormStatus } from "react-dom"

const Submitbtn = () => {
    const {pending} = useFormStatus()
  return (
    <button disabled={pending} className='p-2 rounded-md bg-green-500 shadow-xl  font-semibold hover:bg-green-800 hover:text-white'>
        {
            pending ? 'Saving...' : 'Save'
        }
    </button>
  )
}

export default Submitbtn