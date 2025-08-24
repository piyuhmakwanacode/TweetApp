import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Popup from '../PopUp/popUp.jsx';
import axios from 'axios';
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react';

const ResetPassword = ({ email }) => {
 const [password, setPassword] = useState('');
 const [ChangePass, setChangePass] = useState(false);
 const [error, setError] = useState('');
 const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });
 const navigate = useNavigate();
 const ToggelPassword = () => {
  setChangePass(!ChangePass);
 };
 const handleResetPass = async (e) => {
  e.preventDefault();
  setError('');

  try {
   const response = await axios.post(
    'http://localhost:3000/api/users/changePassword',
    {
     email,
     newPassword: password,
    },
    { withCredentials: true }
   );
   setPopup({ show: true, message: response?.data?.message, type: 'success' });
   navigate('/login');
  } catch (err) {

    console.log(err);
       setPopup({ show: true, message: err?.response?.data?.message, type: 'error' });
  }
 };

 return (
  <>
   <form onSubmit={handleResetPass}>
    <div className="w-full bg-transparent text-white border border-gray-700 rounded-full py-2 pl-12 pr-4 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-slate-500 relative ">
     {ChangePass ? (
      <LockKeyholeOpen
       className="absolute left-4 top-[1.2rem]  w-6 h-6 text-gray-400 cursor-pointer"
       onClick={ToggelPassword}
      />
     ) : (
      <LockKeyhole
       className="absolute left-4 top-[1.2rem]  w-6 h-6 text-gray-400 cursor-pointer"
       onClick={ToggelPassword}
      />
     )}
     <input
      type={ChangePass ? 'text' : 'password'}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="New Password"
      className="h-full w-full text-xl py-2 outline-none border-none"
      maxLength={28}
      required
     />
    </div>

    <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full">
     Reset Password
    </button>

    {error && <p className="text-red-400 mt-2">{error}</p>}
   </form>
   {popup.show && (
    <Popup
     message={popup.message}
     type={popup.type}
     onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
    />
   )}
  </>
 );
};

export default ResetPassword;
