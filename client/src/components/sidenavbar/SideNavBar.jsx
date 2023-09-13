
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
import {CgProfile} from "react-icons/cg"
import {BsChatLeftDots} from "react-icons/bs"
import {RiSecurePaymentLine} from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import LogoutModal from '../modal/LogoutModal'
function SideNavBar() {
const navigate=useNavigate()

  let Menu=[
    {title:'Appointments',icon:<RiUserShared2Line />,
    index:1},
    {title:'Video consultation',icon:<MdOutlineRecentActors />,
    index:2},
    {title:'Chats',icon:<BsChatLeftDots />,
    index:3},
    {title:'Profile',icon:<CgProfile />,
    index:3},
    {title:'Patient Record',icon:<LuStars />,
    index:4},
    {title:'Manage Slots',icon:<BiAddToQueue />,
    index:5},
    {title:'Payments',icon:<RiSecurePaymentLine />,
    index:6,
  },
    {title:'Logout',icon:<LuLogOut />,
    index:6,
  }
  ]


  const handleLogout=async(title)=>{
   try {
    if(title==='Logout'){
      localStorage.removeItem('access-token')
      navigate('/login')
      toast.warning("Logout successfull", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500
      });
      
    }
    if(title==='Profile'){
      console.log(title);
      navigate('/profile')
      
    }

   } catch (error) {
    console.log(error);
   }
  }

    const[open,setOpen]=useState(true)
    const[subMenuOpen,setSubMenuOpen]=useState(false)
    const [openModal, setOpenModal] = React.useState(false);

  return (

    <div className='flex h-screen '  >
       
      <div className={`bg-dark-purple h-screen p-5 pt-8 ${open?"w-80 duration-500":"w-22 duration-500"}   relative  h-auto rounded-2xl m-3`}>
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
              
      
    </div>
  )
}

export default SideNavBar
