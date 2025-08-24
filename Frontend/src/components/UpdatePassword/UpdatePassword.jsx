import React, { useState } from 'react';
import ForgetPassword from '../ForgetPassword/ForgetPassword.jsx';
import CheckOtp from '../CheckOtp/CheckOtp.jsx';
import ResetPassword from '../ResetPassword/ResetPassword.jsx';

const UpdatePassword = () => {
 const [step, setStep] = useState(1);
 const [email, setEmail] = useState('');
 return (
  <div className="max-w-md mx-auto mt-10 p-4">
   {step === 1 && <ForgetPassword setStep={setStep} setEmail={setEmail} />}
   {step === 2 && <CheckOtp setStep={setStep} email={email} />}
   {step === 3 && <ResetPassword email={email} />}
  </div>
 );
};

export default UpdatePassword;
