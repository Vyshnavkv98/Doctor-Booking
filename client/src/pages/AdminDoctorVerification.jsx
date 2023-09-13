import React, { useEffect, useState } from 'react';
import Sidebar from '../components/admin/sidebar/Sidebar';
import DocTable from '../components/admin/table/DocTable';
import axios from '../axios/axios';
import SerachForm from '../components/admin/searchForm/SerachForm';
import { GrUserAdmin } from 'react-icons/gr';
import DoctorVerification from '../components/doctorHomeNav/doctorVerification/DoctorVerification';

function AdiminDoctorVerification() {
  const [searchWord, setSearchWord] = useState('');
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('admin/getuser');
        if (response.status) {
          setAllUsers([...response.data]);
          setUsers([...response.data]);
        }
      } catch (error){}
    })();
  },[]);  

  const getData = (data) => {
    setSearchWord(data);
  };

  useEffect(() => {
    if (searchWord) {
      console.log(searchWord);
      const filteredUsers = allUsers.filter((val) => {
        if (searchWord === '' || /^\s*$/.test(searchWord)) {
          return true;
        } else if (val.firstName.toLowerCase().includes(searchWord.toLowerCase())) {
          return true;
        } else if (val.email.toLowerCase().includes(searchWord.toLowerCase())) {
          return true;
        }
        return false;
      });

      setUsers(filteredUsers);
    } else if(searchWord.length<1) {
      setUsers(allUsers);
    }else{
      setUsers(allUsers);
    }
  }, [searchWord]);

  return (
    <div className='bg-white flex h-screen'>
      <div className='m-5 h-auto'>
        <Sidebar />
      </div>
      <div className='flex flex-col mt-5 flex-1'>
        <div className='mx-5 flex right-end justify-between'>
          <div className='w-3/4'>
            <SerachForm onSubmit={getData} />
          </div>
          <div className=''>
            <GrUserAdmin className='text-4xl pt-1' />
          </div>
        </div>
        <div className='mt-3 flex-1'>
           <DoctorVerification />
        </div>
      </div>
    </div>
  );
}

export default AdiminDoctorVerification;
