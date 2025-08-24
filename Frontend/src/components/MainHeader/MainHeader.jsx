import React from 'react';

const MainHeader = ({ className }) => {
 return (
  <div className={className}>
   <div className="flex h-full w-full justify-center items-center backdrop-blur-md bg-[#040a14]  ">
    <a className="h-full w-1/2 border-r hover:bg-[#33435d54] transition-all duration-200 flex justify-center items-center">For You</a>
    <a className="h-full w-1/2 hover:bg-[#33435d54] transition-all duration-200 flex justify-center items-center">Following</a>
   </div>
  </div>
 );
};

export default MainHeader;
