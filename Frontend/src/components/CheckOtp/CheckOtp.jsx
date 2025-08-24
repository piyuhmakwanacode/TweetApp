import axios from 'axios';
import { User } from 'lucide-react';
import React, { useState } from 'react';
import Popup from '../PopUp/popUp.jsx';

const CheckOtp = ({ setStep, email }) => {
 const [otp, setOtp] = useState('');
 const [error, setError] = useState('');
 const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });

 const handleCheckOtp = async (e) => {
e.preventDefault()
  setError('');
  try {
   const response = await axios.post(
    'http://localhost:3000/api/users/checkOtp',
    { otp, email },
    {
     withCredentials: true,
    }
   );
   console.log(response.data.message);
   setPopup({ show: true, message: response.data.message, type: 'success' });
setTimeout(() => {
      setStep(3);
}, 1500);

    
  } catch (error) {
   console.log(error);
   setError(error.response.data.message);
  }
 };
 return (
  <div className="w-full max-w-md sm:max-w-lg bg-transparent  p-4 sm:p-6 md:p-2 mx-auto flex flex-col justify-center items-center h-[100vh]">
   <div className="text-white text-center flex flex-col gap-1">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Check Otp</h2>
    <p className="text-gray-400 text-base sm:text-lg">Please provide the Otp</p>
   </div>
   <form onSubmit={handleCheckOtp} className="w-full mx-auto mt-10 space-y-6">
    <div className="relative">
     <User className="absolute left-4 top-5.5 w-6 h-6 text-gray-400" />
     <input
      type="text"
      value={otp}
      required
      onChange={(e) => setOtp(e.target.value)}
      placeholder="Enter your otp"
      className="w-full bg-transparent text-white border border-gray-700 rounded-full py-5 pl-12 pr-4 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-slate-500 md:text-xl"
     />
    </div>
    <button
     type="submit"

     className="w-full  py-5 text-center font-bold transition-all duration-500 bg-[linear-gradient(to_right,#16222A_0%,#3A6073_51%,#16222A_100%)] bg-[length:200%_auto] text-white shadow-[0_0_2px_#eee]  block hover:bg-[position:right_center] hover:text-white  bg-transparent  border border-gray-700 rounded-full    text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-slate-500 md:text-xl"
    >
     Submit
    </button>

    {error && <p className="text-red-400 text-center md:text-2xl">{error}</p>}
   </form>
   {popup.show && (
    <Popup
     message={popup.message}
     type={popup.type}
     onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
    />
   )}
  </div>
 );
};

export default CheckOtp;
