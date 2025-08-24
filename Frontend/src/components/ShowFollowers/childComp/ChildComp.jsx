// import React from 'react';
// import { Link } from 'react-router';

import { Link } from "react-router";

// const ChildComp = ({ className,setComp }) => {

//  const cancelComponents = async () => {
//   setTimeout(() => {
//    setComp(false);
//   }, 200);
//  };
//  return (
//   <div className={className} onMouseLeave={cancelComponents}>
//    <div className=" flex justify-between p-3 ">
//     <div className="h-14 w-14 rounded-full  overflow-hidden">
//      <img className="h-full w-full " src="" alt="" />
//     </div>

//     <div className="relative inline-flex h-[40px] w-[40%] overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f797a7_0%,#5e61ff_50%,#2b8fd6_100%)]" />
//      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 hover:bg-[#1b1a31]  transition-all duration-300 px-3 py-2 text-[14px] font-medium text-white backdrop-blur-3xl">
//       Follow
//      </span>
//     </div>
//    </div>
//    <div className="middel flex flex-col gap-2">
//     <div className="">
//      {' '}
//      <h1 className="text-2xl">FullName</h1>
//      <p className="text-slate-600">username</p>
//     </div>
//     <div className="middelText">Lorem, ipsum dolor.</div>
//     <div className="Followers flex justify-center gap-3">
//      <div className="following">0 following</div>
//      <div className="followers">0 followers</div>
//     </div>
//    </div>

    
//         <Link to={"/dashboard"} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]  px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:bg-[linear-gradient(110deg,#000103,15%,#1e2631,55%,#000103)] bg-[length:200%_100%] w-[70%] mx-auto ">
//           Go to Profile
//         </Link>
  
        
      
//   </div>
//  );
// };

// export default ChildComp;

const ChildComp = ({ className, setComp, user }) => {
  const cancelComponents = () => {
    setTimeout(() => {
      setComp(false);
    }, 200);
  };

  return (
    <div className={className} onMouseLeave={cancelComponents}>
      <div className="flex justify-between p-3">
        <div className="h-14 w-14 rounded-full overflow-hidden  flex justify-center items-center">
          <img
            className="h-[90%] w-[90%]  bg-cover"
            src={user?.profilePic || 'https://via.placeholder.com/150'}
            alt={user?.name}
          />
        </div>

        <div className="relative inline-flex h-[40px] w-[40%] overflow-hidden rounded-full p-[2px]">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f797a7_0%,#5e61ff_50%,#2b8fd6_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 hover:bg-[#1b1a31] transition-all duration-300 px-3 py-2 text-[14px] font-medium text-white backdrop-blur-3xl">
            Follow
          </span>
        </div>
      </div>

      <div className="middel flex flex-col gap-2">
        <div>
          <h1 className="text-2xl">{user?.name}</h1>
          <p className="text-slate-400">{user?.username}</p>
        </div>
        <div className="middelText">No bio available</div>
        <div className="Followers flex justify-center gap-3">
          <div className="following">0 following</div>
          <div className="followers">0 followers</div>
        </div>
      </div>

      <Link to={"/dashboard"} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]  px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:bg-[linear-gradient(110deg,#000103,15%,#1e2631,55%,#000103)] bg-[length:200%_100%] w-[70%] mx-auto ">
        Go to Profile
         </Link>
    </div>
  );
};

export default ChildComp;
