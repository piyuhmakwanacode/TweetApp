import React, { useState } from 'react';
import SubScription from '../Subscription/SubScription.jsx';
import { Search } from 'lucide-react';

import ShowFollowers from '../ShowFollowers/ShowFollowers.jsx';

const Lastbar = () => {

 return (
  <>


   <div className=" w-[70%] relative  h-[100vh] hidden lg:block ">
    <div className="input h-14  fixed top-2 w-[40%] ml-6  backdrop:blur-3xl">
     <Search className="absolute top-[13px] left-2" />

     <input
      type="search"
      className="w-[70%] bg-transparent text-white border border-gray-700 rounded-full py-3 pl-10 pr-4 focus:outline-2 focus:border-blue-500 "
      placeholder="Search"
     />
    </div>
    <div className="fixed top-20 flex flex-col gap-7 ml-4">
     <SubScription className=" w-[85%] border p-4 ml-3 flex flex-col gap-5 rounded-2xl " />

   <ShowFollowers/>
    </div>
   </div>
     
  

  </>
 );
};

export default Lastbar;
