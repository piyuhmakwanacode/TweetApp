

import React, { useEffect, useState } from 'react';
import BackGround from '../../../src/assets/react.svg';
import ChildComp from './childComp/ChildComp.jsx';
import axios from 'axios';
import { UserRound } from 'lucide-react';
import { Link } from 'react-router';

const ShowFollowers = () => {
  const [users, setUsers] = useState([]);
  const [hoveredUserId, setHoveredUserId] = useState(null);


  const getAllUsersTweets = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/getallUser`, { withCredentials: true })
      console.log(response.data.data)
      setUsers(response.data.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAllUsersTweets()
  }, [location.pathname]);

  return (
    <div className="userFollows w-full sm:w-[90%] md:w-[85%] border p-4 sm:p-5 ml-0 sm:ml-3 flex flex-col gap-5 rounded-2xl">
      <h1 className="text-xl sm:text-2xl pl-2 sm:pl-5 font-bold">Who to Follow</h1>

      {users.map((user) => (
        <div
          key={user.id}
          className="user border flex flex-col sm:flex-row sm:items-center justify-between gap-4 lg:gap-2 sm:gap-0 px-4 py-3 relative rounded-xl"
        >
          {/* Left - Profile Info */}
          <div className="flex gap-4 sm:gap-7 items-center lg:gap-3">
            <div className="Userlogo h-7 w-7 sm:h-10 sm:w-10 xl:w-9 xl:h-9 rounded-full overflow-hidden">
              {
                user?.profilePicture.length > 0 ? ( <img
                src={user.profilePicture || ''}
                alt={user.name}
                className="h-full w-full  rounded-full object-cover"
                />) : (<div className='h-full w-full border-2 flex justify-center items-end rounded-full '>
                     <UserRound className='size-[28px] text-cyan-800 ' />
              </div>)
             }
            </div>

            <div
              className="flex flex-col gap-1"
      
            >
              <h1 className="text-base sm:text-lg font-semibold hover:cursor-pointer hover:underline transition-all duration-300 lg:text-[14px] xl:text-[16px] text-slate-700">
                {user.fullName}
              </h1>
              <p className="text-sm text-slate-500 ">@{user.username}</p>
            </div>
          </div>

          {/* Follow Button */}
          <Link to={`/dashboard/${user.username}`} className="relative inline-flex h-[38px] w-full sm:w-[20%] md:w-[40%] lg:w-[100px] overflow-hidden rounded-full p-[2px] md:text-[14px]">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f797a7_0%,#5e61ff_50%,#2b8fd6_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 hover:bg-[#1b1a31] transition-all duration-300 px-3 py-1 text-sm font-medium backdrop-blur-3xl">
              Visit
            </span>
          </Link>

        
          {hoveredUserId === user.id && (
            <ChildComp
              user={user}
              setComp={() => setHoveredUserId(null)}
              className="border absolute top-full mt-2 w-full sm:w-[80%] p-3 flex flex-col gap-2 backdrop-blur-md text-white rounded-2xl z-50"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowFollowers;
