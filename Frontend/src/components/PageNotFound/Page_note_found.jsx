import React from 'react';
import backGround from '../../assets/BackGround.jpg';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
const Page_note_found = () => {
  const navigate =useNavigate()
 const onNavigate = async () => {
  try {
   await axios.get('http://localhost:3000/api/users/me', {
    withCredentials: true,
   });
    navigate("/")
  } catch (error) {
   try {
    await axios.get('http://localhost:3000/api/users/refresh', {
     withCredentials: true,
    });
      navigate("/login")
   } catch (error) {
        navigate("/login")
   }
  }
 };
 return (
  <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
   {/* Spotlight background blur */}
   <div className="absolute h-full w-full opacity-[0.4]">
    <img src={backGround} className="h-full w-full bg-cover bg-left" alt="" />
   </div>

   {/* Content */}
   <div className="relative z-10 text-center px-4 flex flex-col justify-center items-center">
    <h1 className="text-[5rem] md:text-[8rem]  font-extrabold text-outline">404</h1>
    <p className="text-3xl md:text-4xl font-semibold text-white drop-shadow-md text-outline-white ">
     Page Not Found!
    </p>

    {/* <button className="mt-8 px-6 py-3 bg- text-black font-medium rounded-full hover:bg-gray-100 transition">
     Back home
    </button> */}

    <button
     onClick={onNavigate}
     className="mt-8 px-6 py-3 bg- font-medium rounded-full transition-bg duration-700  flex h-12 animate-shimmer items-center justify-center border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] text-slate-400 t focus:outline-none   w-40 hover:bg-[linear-gradient(110deg,#000103,25%,#1e2631,55%,#000103)] "
    >
     go to Home
    </button>
   </div>
  </div>
 );
};

export default Page_note_found;
