import React from 'react'
import { FaUsers, FaRegNewspaper } from 'react-icons/fa6'

function Content({ totalUsersData, totalPostsData }) {
  return (
    <div className='px-10 py-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50'>
   <div className='flex gap-6 mb-8'>
       {/* Users Card */}
       <div className='bg-white shadow-xl hover:shadow-2xl transition-all duration-300 w-[300px] p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:scale-105'>
           <h3 className='flex items-center text-xl font-semibold text-gray-700'>
               <FaUsers className='mr-3 text-blue-500 text-2xl' /> 
               Total Users
           </h3>
           <p className='text-6xl font-bold mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text'>
               {totalUsersData?.length || 0}
           </p>
           <p className='text-gray-500 mt-2 text-sm'>Registered users in database</p>
       </div>

       {/* Posts Card */}
       <div className='bg-white shadow-xl hover:shadow-2xl transition-all duration-300 w-[300px] p-8 rounded-2xl border border-gray-100 hover:border-purple-200 hover:scale-105'>
           <h3 className='flex items-center text-xl font-semibold text-gray-700'>
               <FaRegNewspaper className='mr-3 text-purple-500 text-2xl' /> 
               Total Posts
           </h3>
           <p className='text-6xl font-bold mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'>
               {totalPostsData?.length || 0}
           </p>
           <p className='text-gray-500 mt-2 text-sm'>Published posts in database</p>
       </div>
   </div>

   <div className='bg-white p-6 rounded-xl shadow-lg border border-gray-100'>
       <p className='text-gray-600 leading-relaxed'>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dolorem, natus repudiandae id quibusdam eos ea esse consectetur pariatur in vel vero, dolor ipsam placeat, excepturi qui quas consequatur officiis?
       </p>
   </div>
</div>
  )
}

export default Content