import React, { useState, useEffect } from 'react'
import axios from '../../../axios/axios'
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Modal, Typography } from '@mui/material';
import LogoutModal from '../../modal/LogoutModal'
import { useNavigate } from 'react-router-dom';



function DocTable() {

    const [doctors, setDoctors] = useState([]);
    const [laoding, setLoading] = useState(false)
    const [getdata, setGetdata] = useState(false)
    const navigate=useNavigate()

    const handleGetDetails = () => {
        navigate('/admin/doctor-verificcation')
      
    }
   

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('admin/getdoctor-notverified');
                if (response.status === 200) {
                    setDoctors(response.data);
                    setLoading(false)
                }

            } catch (error) {
                console.error('Error fetching Doctor:', error);
            }
        };
        fetchUsers();
    }, []);


    return (
        <div className='flex items-center justify-center py-9'>
            <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-3/4 ">
                <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Image</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Status</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Phone number</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 border-t border-gray-100">

                        {doctors.map((item) => (


                            <tr class="hover:bg-gray-50">
                                <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div class="relative h-10 w-10">
                                        <img
                                            class="h-full w-full rounded-full object-cover object-center"
                                            src={item.image}
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

                                <td class="px-2 py-4">
                                    <div class="flex w-25 ">
                                        <a x-data="{ tooltip: 'Delete' } " onClick={() => handleGetDetails()}>
                                           
                                                <span
                                                    class="inline-flex  items-center gap-1 h-10 w-24 rounded-lg border border-blue-500  px-2 py-1 text-md font-semibold text-blue-400 text-bold cursor-pointer" onClick={() => handleGetDetails()}>
                                                    {laoding && <CircularProgress color="secondary" size={40} thickness={4} />}
                                                    GetDetails
                                                </span>

                                            
                                            {/* {item?.isVerified &&
                                                <span
                                                    class="inline-flex  items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-md font-semibold text-green-600 cursor-pointer">
                                                    {laoding && <CircularProgress color="secondary" size={40} thickness={4} />}
                                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                                    Unblock
                                                </span>

                                            } */}

                                        </a>

                                    </div>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                open={getdata}
                // onClose={handleCloseDetailModal}
                aria-labelledby="detail-modal-title"
                aria-describedby="detail-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '58%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {doctors && (
                        <div>
                            <Typography id="detail-modal-title" variant="h6" component="h2">
                                Doctor Details
                            </Typography>
                            <Typography id="detail-modal-description" sx={{ mt: 2 }}>
                                Name: {doctors.firstName} {doctors.lastName}
                                <br />
                                Email: {doctors.email}
                                <br />
                                Phone: {doctors.phoneNumber}
                                {/* ... other details ... */}
                            </Typography>
                            <Button  sx={{ mt: 2 }}>
                                Close
                            </Button>
                        </div>
                    )}
                </Box>
            </Modal>

        </div>

    )
}

export default DocTable
