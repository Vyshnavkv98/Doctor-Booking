import React, { useState, useEffect } from 'react'
import axios from '../../../axios/axios'
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmationModal from '../../modal/ConfirmationModal';



function Table() {

    const [users, setUsers] = useState([]);
    const [laoding, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };

    const [block, setBlock] = useState(false)

    const handleBlock = () => {
        setBlock(!block)
        setLoading(true)
        const userData = { _id: users[0]._id, blockStatus: block }
        axios.post('/admin/block-user', userData)

    }
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('admin/getuser');
                if (response.status === 200) {
                    setUsers(response.data);
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [block]);


    return (
        <div>
            <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Image</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Status</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">PhoneNumber</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Address</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 border-t border-gray-100">

                        {users.map((item) => (


                            <tr class="hover:bg-gray-50">
                                <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div class="relative h-10 w-10">
                                        <img
                                            class="h-full w-full rounded-full object-cover object-center"
                                            src={item.profileImg}
                                            alt=""
                                        />
                                        <span class="absolute right-0 bottom-0 h-2 w-5 rounded-full bg-green-400 ring ring-white"></span>
                                    </div>
                                    <div class="text-sm">
                                        <div class="font-medium text-gray-700">{item.firstName}</div>
                                        <div class="text-gray-400">{item.email}</div>
                                    </div>
                                </th>
                                <td class="px-6 py-4">
                                    <span
                                        class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                                    >
                                        <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        Active
                                    </span>
                                </td>
                                <td class="px-6 py-4">{item.phoneNumber}</td>
                                <td class="px-6 py-4">
                                    <div class="flex gap-2">
                                    {item.address} 
                                    </div>
                                </td>
                                <td class="px-2 py-4">
                                    <div class="flex w-25 ">
                                        <a x-data="{ tooltip: 'Delete' } ">
                                            {!item?.is_Blocked &&
                                                <span
                                                    class="inline-flex  items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-md font-semibold text-red-600 cursor-pointer" onClick={openModal}>
                                                        {laoding && <CircularProgress color="secondary" size={20} thickness={4} />}
                                                    <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                                    Block
                                                </span>

                                            }
                                            {item?.is_Blocked &&
                                                <span
                                                    class="inline-flex  items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-md font-semibold text-green-600 cursor-pointer" onClick={openModal}>
                                                        {laoding && <CircularProgress color="secondary" size={20} thickness={4} />}
                                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                                    Unblock
                                                </span>

                                            }

                                        </a>
                                        <ConfirmationModal open={modalOpen} onClose={closeModal} onConfirm={()=>handleBlock()} />

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Table
