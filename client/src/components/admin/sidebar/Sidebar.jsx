import React from 'react';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';


import { useStateContext } from "../../../context/ContextProvider"



const Sidebar = () => {

const navigate= useNavigate()

  const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'wallet',
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
          name: 'Doctor',
          icon: <IoMdContacts />,
        },
        {
          name: 'Doctor Verification',
          icon: <RiContactsLine />,
        },
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'Departments',
          icon: <AiOutlineCalendar />,
          subtitles: [
            {
              subName: 'Add departments',
            },
            {
              subName: 'All departments',
            }
          ]
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

  const handlecontrol = (item) => {

   try {
    if (item === 'User') {
      console.log(item);
      navigate('/admin/usercontrol')
    }
    if(item==='Doctor Verification'){
     navigate('admin/doctor-verification')
     console.log('ggggggggggggg');

    }
   } catch (error) {
    console.log(error);
   }
    


  }

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-xl  text-white  text-md m-2 overflow-y-hidden';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 overflow-y-hidden';

  return (
    <div className='flex overflow-y-hidden w-80 px-9 rounded-xl  bg-slate-900 '>
      <div className="ml-3 h-screen -hidden overflow-y-hidden  md:hover:overflow-auto pb-9   mt-5 mx-9">
        {activeMenu && (
          <>
            <div className="flex justify-between items-center">
              <Link to="/admin/doctor-verify" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-3xl font-extrabold tracking-tight dark:text-white text-slate-900">
                <SiShopware /> <span>Meds</span>
              </Link>

            </div>
            <div className="mt-10 bg-black-300 ">
             
                <div>
                  <p className="text-gray-400 dark:text-gray-400 text-2xl m-3  mt-4 uppercase">
                   Dashboard
                  </p>
                 
                    <NavLink
                      className={ activeLink }
                    >
                     <FiShoppingBag />
                      <span className="capitalize text-xl ">Wallet</span>
                      {/* {link.subTitle && <span className="capitalize text-md ">{link.subTitle.name}</span>
                      } */}

                    </NavLink>
                </div>
                <div>
                  <p className="text-gray-400 dark:text-gray-400 text-2xl m-3  mt-4 uppercase">
                   Pages
                  </p>
                 
                    <NavLink
                      className={ activeLink }
                      to={'/admin/usercontrol'}
                    >
                     <AiOutlineShoppingCart />
                      <span className="capitalize text-xl ">User</span>
                      {/* {link.subTitle && <span className="capitalize text-md ">{link.subTitle.name}</span>
                      } */}

                    </NavLink>
                    <NavLink
                      className={ activeLink }
                      to={'/admin/doctor-verify'}
                    >
                     <IoMdContacts />
                      <span className="capitalize text-xl ">Doctor</span>
                      {/* {link.subTitle && <span className="capitalize text-md ">{link.subTitle.name}</span>
                      } */}

                    </NavLink>
                    <NavLink
                      onClick={(link) => handlecontrol(``)}
                      className={ activeLink }
                    >
                    <RiContactsLine />
                      <span className="capitalize text-xl ">Doctor verification</span>
                      {/* {link.subTitle && <span className="capitalize text-md ">{link.subTitle.name}</span>
                      } */}

                    </NavLink>
                    <NavLink
                      onClick={(link) => handlecontrol(``)}
                      className={ activeLink }
                      to={'/admin'}
                    >
                    <FiLogOut/>
                      <span className="capitalize text-xl ">Logout</span>
                      {/* {link.subTitle && <span className="capitalize text-md ">{link.subTitle.name}</span>
                      } */}

                    </NavLink>
                </div>

                <div>
                  <p className="text-gray-400 dark:text-gray-400 text-2xl m-3  mt-4 uppercase">
                   App
                  </p>
                 
                    <NavLink
                      onClick={(link) => handlecontrol(``)}
                      className={ activeLink }
                    >
                    <AiOutlineCalendar />
                      <Link className="capitalize text-xl " to={'/admin/add-department'}>Departments</Link>
                      {/* {link.subTitle && <span className="capitalize text-md ">{link.subTitle.name}</span>
                      } */}

                    </NavLink>
                </div>

                <div>
                  <p className="text-gray-400 dark:text-gray-400 text-2xl m-3  mt-4 uppercase">
                   Charts
                  </p>
                 
                    <NavLink
                      onClick={(link) => handlecontrol(``)}
                      className={ activeLink }
                    >
                      <AiOutlineStock />
                      <span className="capitalize text-xl ">Line</span>
                      {/* {link.subTitle && <span className="capitalize text-md ">{link.subTitle.name}</span>
                      } */}

                    </NavLink>
                    <NavLink
                      onClick={(link) => handlecontrol(``)}
                      className={ activeLink }
                    >
                     <AiOutlineAreaChart />
                      <span className="capitalize text-xl ">Area</span>
                      {/* {link.subTitle && <span className="capitalize text-md ">{link.subTitle.name}</span>
                      } */}

                    </NavLink>
                    <NavLink
                      onClick={(link) => handlecontrol(``)}
                      className={ activeLink }
                    >
                      <AiOutlineBarChart />
                      <span className="capitalize text-xl ">Bar</span>
                      {/* {link.subTitle && <span className="capitalize text-md ">{link.subTitle.name}</span>
                      } */}

                    </NavLink>
                </div>
          
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;