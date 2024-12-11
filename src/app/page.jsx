"use client"

import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Vercel from '../../public/vercel.svg'
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";

export default function Home() {
  
  const { data: session } = useSession();

  return (
    <main className="bg-gradient-to-b from-pink-50 to-pink-100 min-h-screen">
     <Container>
       <Navbar session={session} />
       <div className="flex-grow text-center p-10">
         <h3 className="text-5xl font-semibold text-gray-800">NextJS Dashboard</h3>
         <p className="text-gray-600 mt-3 text-lg">Become full-stack developer with NextJS</p>
         <div className="flex justify-center my-10 hover:scale-105 transition-transform duration-300">
           <Image src={Vercel} width={300} height={0} alt="vercel logo" 
                  className="drop-shadow-lg"
           />
         </div>
       </div>
       <Footer />
     </Container>
   </main>
  );
}
