import { duration } from "@mui/material"
import { useState } from "react"
import React  from 'react'
import axios from "../../axios/axios"
import {BsArrowLeftCircleFill} from "react-icons/bs"
import {BsArrowRightCircleFill} from "react-icons/bs"
import {BsChevronDown} from "react-icons/bs"
import {CiSearch} from "react-icons/ci"
import {RiUserShared2Line} from "react-icons/ri"
import {MdOutlineRecentActors} from "react-icons/md"
import {GoTrash} from "react-icons/go"
import {LuStars} from "react-icons/lu"
import {LuLogOut} from "react-icons/lu"
import {BiAddToQueue} from "react-icons/bi"
import {AiOutlineFileAdd} from "react-icons/ai"
import {AiOutlineFolderAdd} from "react-icons/ai"


function SideNavBar() {
  let Menu=[
    {title:'Shared with me',icon:<RiUserShared2Line />,
    index:1},
    {title:'Recent',icon:<MdOutlineRecentActors />,
    index:2},
    {title:'Trash',icon:<GoTrash />,
    index:3},
    {title:'Starred',icon:<LuStars />,
    index:4},
    {title:'Logout',icon:<LuLogOut />,
    index:5},
    {title:'Add New',icon:<BiAddToQueue />,
    index:6,
    subMenu:true,
    spacing:true,
    subMenuItems:[
{ title:'upload file',
index:7,icon:<AiOutlineFileAdd />},
{ title:'Create folder',
index:8,icon:<AiOutlineFolderAdd />}

    ]  
  }
  ]


  const handleLogout=async(title)=>{
   try {
      console.log('from logout fn');
    if(title==='Logout'){
      console.log('helllooooo');
    const res=await axios.post("/logoutAll")
    if(res){
    }
    }

   } catch (error) {
    console.log(error);
   }
  }

    const[open,setOpen]=useState(true)
    const[subMenuOpen,setSubMenuOpen]=useState(false)

  return (

    <div className='flex'  >
       
      <div className={`bg-dark-purple h-screen p-5 pt-8 ${open?"w-80":"w-22"} transition duration-500 relative `}>
    { open? <BsArrowLeftCircleFill className='text-3xl rounded-full absolute -right-3 text-white border border-dark-purple top-9 cursor-pointer' onClick={()=>setOpen(!open)} />:
    <BsArrowRightCircleFill className='text-3xl rounded-full absolute -right-3 border text-white border-dark-purple top-9 border-3 cursor-pointer' onClick={()=>setOpen(!open)} />
  }


<div className={`flex item-center bg-light-white  rounded-md  mt-6 ${open?"px-4":"px-2.5"} py-3`}>
    <CiSearch />
    <input type="text" placeholder="search..." className={`bg-transparent focus:outline-none text-white text-xl ${!open && "hidden"}`} fullwidth/>
    
    </div>
    <ul className={`pt-2 mt-16 `}>
       {Menu.map((menu)=>(
        <>
        <li key={menu.index} className={`text-gray-300 text-lg flex item-center gap-x-3 cursor-pointer p-4 rounded-md hover:bg-light-white  ${menu.spacing?'mt-5 text-4xl font-bold':"mt-2"}`} onClick={()=>handleLogout(menu.title)}>
        <span className="text-2xl"> {menu.icon}</span><span className={`text-white duration-300  ${!open && "hidden"}`}  >{menu.title}</span>
        {menu.subMenuItems && open&& (
          <BsChevronDown className={` mt-2 ${subMenuOpen && "rotate-180"}`} onClick={()=>setSubMenuOpen(!subMenuOpen)}/>
        )}
        </li>
        {menu.subMenuItems && open && (
          <ul>
            {menu.subMenuItems.map((items)=>(
              <li key={items.index}  className={`text-gray-300 text-lg flex item-center gap-x-3 cursor-pointer mx-7 rounded-md hover:bg-light-white  ${menu.spacing?'mt-5 text-4xl font-bold':"mt-2"}`}>
              <span className="text-2xl">{subMenuOpen&&items.icon}</span>  {subMenuOpen && items.title}
              </li>
            ))}
          </ul>
        )}
        </>
       ))}
    </ul>

      </div>
     
      
      <div className='p-7'><h1 className='text-2xl font-semibold'>Home page</h1></div>

     
      
    </div>
  )
}

export default SideNavBar
