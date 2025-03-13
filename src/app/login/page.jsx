"use client"

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const { data: session } = useSession();
    if (session) router.replace("welcome")

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ตรวจสอบว่ากรอกข้อมูลครบไหม
        if (!email || !password) {
            
            alert("กรุณากรอกอีเมลและรหัสผ่าน!");
            return;
        }

        try {
            const res = await signIn("credentials", {
                email, 
                password, 
                redirect: false
            })

            if (res.error) {
                
                alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง!");
                return;
            }

            alert("เข้าสู่ระบบสำเร็จ!");
            router.replace("welcome");

        } catch(error) {
            console.log(error);
            
            alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง");
        }
    }

    return (
        <Container>
            <Navbar />
            <div className='flex-grow'>
                <div className='flex justify-center items-center min-h-[80vh]'>
                    <div className='w-[400px] bg-white shadow-2xl p-10 mt-5 rounded-2xl'>
                        <h3 className='text-3xl font-semibold text-gray-800 mb-2'>Login</h3>
                        <hr className='my-4 border-gray-200' />
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className='bg-red-500 text-sm text-white py-2 px-4 rounded-lg mt-2 shadow-sm'>
                                    {error}
                                </div>
                            )}

                            <input 
                                type="text" 
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
                            <button 
                                className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg text-lg my-3 transition-colors duration-200 shadow-md hover:shadow-lg font-medium' 
                                type='submit'
                            >
                                Sign In
                            </button>
                            <hr className='my-6 border-gray-200' />
                            <p className='text-gray-600 text-center'>
                                Do not have an account? Go to{' '}
                                <Link href="/register" className='text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200'>
                                    Register
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

export default LoginPage