import React, { useState } from 'react'
import {AiOutlineFolderAdd} from 'react-icons/ai'

function AddFolder() {

const[open,setOpen]=useState(false)
const [name,setName]=useState('')

const handleSubmit=(e)=>{
  e.preventDefault()


}


  return (
    <>
    <button className=' m-0 mr-2 ' onClick={()=>setOpen(!open)}>
          <AiOutlineFolderAdd className='bg-green-300 text-3xl'/>
          
    </button>
   {open &&
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96" onSubmit={(e)=>handleSubmit(e)}>
    <div class="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
        FolderName
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Foldername" value={name} onChange={(e)=>setName(e.target.value)}/>
    </div>
    <div className="flex items-end ">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={()=>setOpen(false)}>
       cancel
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
       Create
      </button>
      
    </div>
  </form>}

  </>
  )
}

export default AddFolder
