import React from 'react';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';

 import { useStateContext } from "../../../context/ContextProvider"



const Sidebar = () => {

  const navigate=useNavigate()

    const links = [
        {
          title: 'Dashboard',
          links: [
            {
              name: 'ecommerce',
              icon: <FiShoppingBag />,
            },
          ],
        },
      
        {
          title: 'Pages',
          links: [
            {
              name: 'User',
              icon: <AiOutlineShoppingCart />,
            },
            {
              name: 'employees',
              icon: <IoMdContacts />,
            },
            {
              name: 'customers',
              icon: <RiContactsLine />,
            },
          ],
        },
        {
          title: 'Apps',
          links: [
            {
              name: 'calendar',
              icon: <AiOutlineCalendar />,
            },
            {
              name: 'kanban',
              icon: <BsKanban />,
            },
            {
              name: 'editor',
              icon: <FiEdit />,
            },
            {
              name: 'color-picker',
              icon: <BiColorFill />,
            },
          ],
        },
        {
          title: 'Charts',
          links: [
            {
              name: 'line',
              icon: <AiOutlineStock />,
            },
            {
              name: 'area',
              icon: <AiOutlineAreaChart />,
            },
      
            {
              name: 'bar',
              icon: <AiOutlineBarChart />,
            },
           
          ],
        },
      ];

  
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const handlecontrol=(item)=>{
    
    if(item==='User'){
      navigate('/admin/control')
    }
  

  }

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 overflow-y-hidden';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 overflow-y-hidden';

  return (
    <div className='flex overflow-y-hidden w-96 px-9  bg-slate-900'>
    <div className="ml-3 h-screen -hidden overflow-y-hidden  md:hover:overflow-auto pb-9   mt-5 mx-9">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-3xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span>Drive</span>
            </Link>
         
          </div>
          <div className="mt-10 bg-black-300 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 text-2xl m-3  mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    
                    key={link.name}
                    onClick={()=>handlecontrol(`${link.name}`)}
                    
                    className={({ isActive }) => (isActive ? activeLink : normalLink)} 
                  
                  >
                    {link.icon}
                    <span className="capitalize text-xl ">{link.name}</span>
                  
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default Sidebar;