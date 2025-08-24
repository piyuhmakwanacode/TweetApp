import React from 'react';
import { Link } from 'react-router';
const SubScription = ({ className }) => {
 return (
 
   <div className={`${className} px-3 sm:px-4 md:px-6`}>
  <h1 className="text-xl sm:text-2xl font-bold text-white">Subscribe to Premium</h1>
  <p className="text-sm sm:text-base text-slate-400 mt-1">
    Subscribe to unlock new features and if eligible, receive a share of revenue.
  </p>

  <Link
    to="/SubScribe"
    className="relative inline-flex h-[45px] sm:h-[50px] w-full sm:w-[60%] md:w-[50%] lg:w-[55%] mt-4 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2  lg:text-[17px]focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 "
  >
    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 hover:bg-slate-900 transition-all duration-300 px-4 text-sm sm:text-base font-medium text-white backdrop-blur-3xl lg:text-[15px] ">
      Subscription
    </span>
  </Link>
</div>

 );
};

export default SubScription;
