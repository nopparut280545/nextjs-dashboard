import React from 'react'
import Link from 'next/link'

function SideNav() {
  return (
    <nav className='shadow-lg p-8 rounded-xl bg-white'>
   <ul className='space-y-2'>
       <li>
           <Link 
               className='block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors duration-200 hover:text-blue-600'
               href="/admin"
           >
               Dashboard
           </Link>
       </li>
       <li>
           <Link 
               className='block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors duration-200 hover:text-blue-600'
               href="/admin/users"
           >
               Users
           </Link>
       </li>
       <li>
           <Link 
               className='block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors duration-200 hover:text-blue-600'
               href="/admin/posts"
           >
               Posts
           </Link>
       </li>
   </ul>
</nav>
  )
}

export default SideNav