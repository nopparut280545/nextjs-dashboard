"use client"

import React, { useState, useEffect } from 'react'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import Container from '../components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

function AdminUserManagePage() {

    const { data: session } = useSession();
    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/welcome");

    const [allUsersData, setAllUsersData] = useState([]);

    console.log("allUsersData: ", allUsersData)

    const getAllUsersData = async () => {
        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }

            const data = await res.json();
            setAllUsersData(data.totalUsers);

        } catch(error) {
            console.log("Error loading users: ", error);
        }
    }

    useEffect(() => {
        getAllUsersData();
    }, [])

  return (
    <Container>
        <AdminNav session={session} />
        <div className='flex-grow bg-gray-50'>
   <div className='container mx-auto'>
       <div className='flex gap-6 py-6'>
           <SideNav />
           <div className='flex-1 bg-white rounded-xl shadow-md p-8'>
               <h3 className='text-3xl font-semibold text-gray-800 mb-3'>Manage Users</h3>
               <p className='text-gray-600 mb-6'>A list of users retrieved from a MongoDB database</p>

               <div className='shadow-lg rounded-xl overflow-hidden'>
                   <table className='w-full bg-white'>
                       <thead>
                           <tr className='bg-gray-100 border-b'>
                               <th className='p-4 text-left text-gray-600 font-medium'>ID</th>
                               <th className='p-4 text-left text-gray-600 font-medium'>Username</th>
                               <th className='p-4 text-left text-gray-600 font-medium'>Email</th>
                               <th className='p-4 text-left text-gray-600 font-medium'>Role</th>
                               <th className='p-4 text-left text-gray-600 font-medium'>Actions</th>
                           </tr>
                       </thead>
                       <tbody>
                           {allUsersData?.map(val => (
                               <tr key={val._id} className='border-b hover:bg-gray-50 transition-colors duration-150'>
                                   <td className='p-4 text-gray-700'>{val._id}</td>
                                   <td className='p-4 text-gray-700'>{val.name}</td>
                                   <td className='p-4 text-gray-700'>{val.email}</td>
                                   <td className='p-4'>
                                       <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium'>
                                           {val.role}
                                       </span>
                                   </td>
                                   <td className='p-4'>
                                       <div className='flex gap-2'>
                                           <Link 
                                               className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200'
                                               href={`/admin/users/edit/${val._id}`}
                                           >
                                               Edit
                                           </Link>
                                           <DeleteBtn id={val._id} />
                                       </div>
                                   </td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
               </div>
           </div>
       </div>
   </div>
</div>
        <Footer />
    </Container>
  )
}

export default AdminUserManagePage