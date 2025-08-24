import axios from "axios";
import { UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";

const FollowingUserCard = ({ follower }) => {
  const [isUserFollow, setIsUserFollow] = useState(false);

  const user = follower.users_Followed_Channel;
  console.log(user);

  const toggetFollow = async () => {
    setIsUserFollow((prev) => !prev);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/follow/ToggelFollowers/${user._id}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isUserSubscribe = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/follow/isFollowsChannel/${user._id}`,
        { withCredentials: true }
      );
      console.log(response.data.data);
      setIsUserFollow(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ((Object.keys(user).length > 0)) {
      isUserSubscribe();
    }
  }, [location.pathname]);

  return (<>
    <div className="flex items-center justify-between p-4  transition duration-200">
      {/* Left: Profile Pic + Name */}
      <div className="flex items-center space-x-4">
      {user.profilePicture.length>0 ? ( <img
          src={user?.profilePicture}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />) : (<div className="size-12 rounded-full border bg-[#080a17] flex justify-center items-end overflow-hidden">
            <UserRound className="size-[90%] text-slate-800" />

        </div>)}
    
        <div className="text-sm">
          <p className="font-semibold text-gray-800">{user?.fullName}</p>
          <p className="text-gray-500">@{user?.username}</p>
        </div>
      </div>
      {isUserFollow ? (
        <div
          className="w-[25%] md:w-[20%] p-2 border-none text-[16px] text-cyan-900 rounded-[7px] tracking-[4px] font-extrabold  transition-all duration-500 bg-[#020b13] shadow-[0_0_3.5px_#008cff] hover:shadow-[0_0_1px_#008cff,0_0_1px_#008cff,0_0_3px_#008cff,0_0_7px_#008cff]  md:top-4 font-[Roboto] hover:text-cyan-500 font-custom-font cursor-pointer flex items-center justify-center"
          onClick={toggetFollow}
        >
          <p>Unfollow</p>
        </div>
      ) : (
        <div
          className="w-[25%] md:w-[20%] p-2 border-none text-[16px] text-cyan-900 rounded-[7px] tracking-[4px] font-extrabold  transition-all duration-500 bg-[#020b13] shadow-[0_0_3.5px_#008cff] hover:shadow-[0_0_1px_#008cff,0_0_1px_#008cff,0_0_3px_#008cff,0_0_7px_#008cff]  md:top-4 font-[Roboto] hover:text-cyan-500 font-custom-font cursor-pointer flex items-center justify-center"
          onClick={toggetFollow}
        >
          <p>Follow</p>
        </div>
      )}
    </div>
  <div className="w-[96%] mx-auto border-b border-dashed  " /></>
  );
};

export default FollowingUserCard;
