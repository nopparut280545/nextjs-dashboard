"use client"

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { data: session } = useSession();
    if (session) redirect("/welcome");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setError("Password do not match");
            return;
        }

        if (!name || !email || !password || !confirmPassword) {
            setError("Please complete all inputs");
            return;
        }

        try {

            const resUserExists = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/userExists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            const { user } = await resUserExists.json();

            if (user) {
                setError("User already exists.");
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if (res.ok) {
                const form = e.target;
                setError("");
                setSuccess("User registered successfully.");
                form.reset();
            } else {
                console.log("User registration failed.");
            }

        } catch(error) {
            console.log("Error during registration: ", error);
        }
    }

  return (
    <Container>
        <Navbar />
        <div className='flex-grow'>
   <div className='flex justify-center items-center min-h-[80vh]'>
       <div className='w-[400px] bg-white shadow-2xl p-10 mt-5 rounded-2xl'>
           <h3 className='text-3xl font-semibold text-gray-800 mb-2'>Register</h3>
           <hr className='my-4 border-gray-200' />
           <form onSubmit={handleSubmit}>
               {error && (
                   <div className='bg-red-500 text-sm text-white py-2 px-4 rounded-lg mt-2 shadow-sm'>
                       {error}
                   </div>
               )}

               {success && (
                   <div className='bg-green-500 text-sm text-white py-2 px-4 rounded-lg mt-2 shadow-sm'>
                       {success}
                   </div>
               )}

               <input 
                   type="text" 
                   onChange={(e) => setName(e.target.value)} 
                   className='w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-lg text-lg my-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' 
                   placeholder='Enter your name' 
               />
               <input 
                   type="email" 
                   onChange={(e) => setEmail(e.target.value)} 
                   className='w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-lg text-lg my-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' 
                   placeholder='Enter your email' 
               />
               <input 
                   type="password" 
                   onChange={(e) => setPassword(e.target.value)} 
                   className='w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-lg text-lg my-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' 
                   placeholder='Enter your password' 
               />
               <input 
                   type="password" 
                   onChange={(e) => setConfirmPassword(e.target.value)} 
                   className='w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-lg text-lg my-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' 
                   placeholder='Confirm your password' 
               />
               <button 
                   className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg text-lg my-3 transition-colors duration-200 shadow-md hover:shadow-lg font-medium' 
                   type='submit'
               >
                   Sign Up
               </button>
               <hr className='my-6 border-gray-200' />
               <p className='text-gray-600 text-center'>
                   Already have an account? Go to{' '}
                   <Link href="/login" className='text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200'>
                       Login
                   </Link>
                   {' '}Page
               </p>
           </form>
       </div>
   </div>
</div>
        <Footer />
    </Container>
  )
}

export default RegisterPage