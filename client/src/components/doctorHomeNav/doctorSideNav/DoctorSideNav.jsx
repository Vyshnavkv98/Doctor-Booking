import React, { useState } from 'react';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { MdOutlineSick } from 'react-icons/md';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { BsChatLeftDots } from 'react-icons/bs';
import { BsCameraVideo } from 'react-icons/bs';
import { MdOutlinePayment } from 'react-icons/md';
import { MdManageAccounts } from 'react-icons/md';

import { useStateContext } from "../../../context/ContextProvider"
import { Typography } from '@mui/material';



const DoctorSideNav = () => {

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };

    const handleLogout=()=>{
      localStorage.removeItem('accessToken')

      if( localStorage.getItem('accessToken')==null) navigate('doctor-login')
       
    }

    const handlecontrol = (item) => {

        try {
            if (item === 'User') {
                navigate('/admin/control')
            }
            if (item === 'Manage Slot') {

                navigate('/Doctor-manage-slots')
               
            }
        } catch (error) {
            console.log(error);
        }



    }

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 overflow-y-hidden';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 overflow-y-hidden';

    return (
        <div className={`flex overflow-y-hidden m-0 p-0 mr-0 gap-0 bg-dark-purple ${open ? "w-96 duration-1000" : "w-auto m-0 p-0 duration-500"} transition relative`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className="ml-3 h-screen -hidden overflow-y-hidden  md:hover:overflow-auto pb-9  gap-0 mt-5 mx-9">
                {activeMenu && (
                    <>
                        <div className="flex justify-between items-center">
                            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-3xl font-extrabold tracking-tight dark:text-white text-slate-900">
                                {/* <SiShopware /> <span>Drive</span> */}
                            </Link>

                        </div>
                        <div className="mt-10 bg-black-300 ">
                            <div >

                                <p className={`text-gray-400 dark:text-gray-400 text-2xl m-3  mt-4 uppercase ${!open && 'hidden'}`}>
                                    Appointment
                                </p>
                                <NavLink
                                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                >
                                    <span className={`inline-block ${!open && 'text-2xl mt-4'}`}><FiShoppingBag /></span>
                                    <Link className={`capitalize text-xl ${!open && 'hidden'}`}>Doctor</Link>

                                </NavLink>

                            </div>
                            <div >

                                <p className={`text-gray-400 dark:text-gray-400 text-2xl m-3  mt-4 uppercase ${!open && 'hidden'}`}>
                                    Pages
                                </p>
                                <NavLink
                                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                >
                                    <span className={`inline-block ${!open && 'text-2xl mt-4'}`}><BsCameraVideo /></span>
                                    <Link className={`capitalize text-xl ${!open && 'hidden'}`}>Video consultaion</Link>

                                </NavLink>
                                <NavLink
                                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                >
                                    <span className={`inline-block ${!open && 'text-2xl mt-4'}`}><BsChatLeftDots /></span>
                                    <Link className={`capitalize text-xl ${!open && 'hidden'}`}>Chat</Link>

                                </NavLink>
                                <NavLink
                                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                >
                                    <span className={`inline-block ${!open && 'text-2xl mt-4'}`}><MdOutlineSick /></span>
                                    <Link className={`capitalize text-xl ${!open && 'hidden'}`}>Patient records</Link>

                                </NavLink>
                                <NavLink
                                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                >
                                    <span className={`inline-block ${!open && 'text-2xl mt-4'}`}><MdOutlinePayment /></span>
                                    <Link className={`capitalize text-xl ${!open && 'hidden'}`}>Payment</Link>

                                </NavLink>
                                <NavLink
                                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                >
                                    <span className={`inline-block ${!open && 'text-2xl mt-4'}`}><MdManageAccounts /></span>
                                    <Link className={`capitalize text-xl ${!open && 'hidden'}`} to={'/doctor-manage-slots'}>Manage Slot</Link>

                                </NavLink>

                            </div>
                            <div >

                                <p className={`text-gray-400 dark:text-gray-400 text-2xl m-3  mt-4 uppercase ${!open && 'hidden'}`}>
                                    Profile
                                </p>
                                <NavLink
                                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                >
                                    <span className={`inline-block ${!open && 'text-2xl mt-4'}`}><FiShoppingBag /></span>
                                    <Link className={`capitalize text-xl ${!open && 'hidden'}`}>Verification</Link>

                                </NavLink>
                                <NavLink
                                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                >
                                    <span className={`inline-block ${!open && 'text-2xl mt-4'}`}><FiShoppingBag /></span>
                                    <Link className={`capitalize text-xl ${!open && 'hidden'}`} to={'/doctor-login'} onClick={()=>handleLogout()} >Logout</Link>

                                </NavLink>

                            </div>
                            <div >

                                <p className={`text-gray-400 dark:text-gray-400 text-2xl m-3  mt-4 uppercase ${!open && 'hidden'}`}>
                                    Chart
                                </p>
                                <NavLink
                                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                >
                                    <span className={`inline-block ${!open && 'text-2xl mt-4'}`}><AiOutlineAreaChart /></span>
                                    <Link className={`capitalize text-xl ${!open && 'hidden'}`}>Area</Link>

                                </NavLink>
                                <NavLink
                                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                >
                                    <span className={`inline-block ${!open && 'text-2xl mt-4'}`}><AiOutlineStock /></span>
                                    <Link className={`capitalize text-xl ${!open && 'hidden'}`}>Line</Link>

                                </NavLink>
                                <NavLink
                                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                >
                                    <span className={`inline-block ${!open && 'text-2xl mt-4'}`}><AiOutlineBarChart /></span>
                                    <Link className={`capitalize text-xl ${!open && 'hidden'}`}>Bar</Link>

                                </NavLink>

                            </div>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DoctorSideNav;