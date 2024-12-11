import React from 'react'
import Link from 'next/link'
import Logo from '../../../../public/next.svg'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

function AdminNav({ session }) {
  return (
    <nav className='bg-white shadow-lg border-b'>
   <div className='container mx-auto'>
       <div className='flex justify-between items-center p-4'>
           <div className='transition-transform duration-200 hover:opacity-80'>
               <Link href="/">
                   <Image src={Logo} width={100} height={100} alt="NextJS Logo" className='object-contain' />
               </Link>
           </div>
           <ul className='flex items-center gap-4'>
               {!session ? (
                   <>
                       <li>
                           <Link href="/login" 
                               className='text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg transition-colors duration-200'>
                               Login
                           </Link>
                       </li>
                       <li>
                           <Link href="/register" 
                               className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200'>
                               Register
                           </Link>
                       </li>
                   </>
               ) : (
                   <li>
                       <a onClick={() => signOut()} 
                           className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 cursor-pointer'>
                           Logout
                       </a>
                   </li>
               )}
           </ul>
       </div>
   </div>
</nav>
  )
}

export default AdminNav