import axios from "axios";
import { CalendarDays, Ellipsis, Link, MapPin, UserPen } from "lucide-react";
import React, { useEffect, useState } from "react";

import { NavLink, useLocation, useNavigate } from "react-router";

const User_DashBoard_Details = ({ className, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const date = new Date(user.dateOfBirth);
  const [toggelFollow, setToggelFollow] = useState(false);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowedUser, setUserFollowedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getUserfollowers, setGetUserfollowers] = useState(false);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const [DashBoardImage, setDashBoardImage] = useState(false);
  const handle_Update_user = () => {
    navigate("/updateUser");
  };
  const handleCoverImage = () => {
    navigate("/SetCoverImage");
  };
  const handleProfilePicture = () => {
    navigate("/SetProfilePicture");
  };

  const handelUserDetails = () => {
    setDashBoardImage(!DashBoardImage);
  };
  useEffect(() => {
    if (
      location.pathname === `/dashboard/${user.username}` &&
      Object.keys(user).length > 0
    ) {
      isUserAllerdyFollows();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (
      location.pathname === `/dashboard/${user.username}` &&
      Object.keys(user).length > 0
    ) {
      getFollowersOfUser();
      getFollowedUserofchannel();
      setGetUserfollowers(false);
    }
  }, [location.pathname, getUserfollowers]);

  const toggelUserFollowes = async () => {
    setToggelFollow((prev) => !prev);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/follow/ToggelFollowers/${user._id}`,
        {},
        { withCredentials: true }
      );
      console.log(response);
      setGetUserfollowers(true);
    } catch (error) {
      setToggelFollow((prev) => prev);
      console.log(error);
    }
  };

  const isUserAllerdyFollows = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/follow/isFollowsChannel/${user._id}`,
        { withCredentials: true }
      );
      console.log(response.data.data);
      setToggelFollow(response.data.data.follow);
    } catch (error) {
      console.log(error);
      setToggelFollow((prev) => prev);
    }
  };

  const getFollowersOfUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/follow/getUserfollowers/${user._id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUserFollowers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFollowedUserofchannel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/follow/getuserFollowedChannel/${user._id}`,
        { withCredentials: true }
      );
      console.log(response.data)
      if (response.status === 200) {
        setUserFollowedUser(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={className}>
        {toggelFollow ? (
          <button
            className="w-[30%] md:w-[25%] py-2 px-1 border-none text-[14px] sm:text-[17px] text-cyan-900 rounded-[7px] tracking-[1px] font-extrabold  transition-all duration-500 bg-[#020b13] shadow-[0_0_3.5px_#008cff] hover:shadow-[0_0_1px_#008cff,0_0_1px_#008cff,0_0_3px_#008cff,0_0_7px_#008cff] absolute right-[30%] md:right-[20%] top-5 sm:top-3 md:top-4 font-[Roboto] hover:text-cyan-500   md:text-[22px]"
            onClick={toggelUserFollowes}
          >
            unfollow
          </button>
        ) : (
          <button
            className="w-[30%] md:w-[25%] py-2 px-1 border-none text-[14px] sm:text-[17px] text-cyan-900 rounded-[7px] tracking-[1px] font-extrabold  transition-all duration-500 bg-[#020b13] shadow-[0_0_3.5px_#008cff] hover:shadow-[0_0_1px_#008cff,0_0_1px_#008cff,0_0_3px_#008cff,0_0_7px_#008cff] absolute right-[30%] md:right-[20%] top-5 sm:top-3 md:top-4 font-[Roboto] hover:text-cyan-500   md:text-[22px]"
            onClick={toggelUserFollowes}
          >
            follow
          </button>
        )}

        <div
          className="absolute  right-4 top-3.5 border bg-[#0c0e0c] h-10 flex w-10 justify-center items-center rounded-full  cursor-pointer hover:bg-[#151827] transition-all duration-300"
          onClick={handelUserDetails}
        >
          <Ellipsis />
        </div>

        <div
          className={`border rounded-2xl p-2 bg-black backdrop-blur-xl w-[150px] md:w-48 absolute right-15 top-2 gap-2 ${
            DashBoardImage ? "flex" : "hidden"
          }
          flex-col justify-center items-center 
    `}
        >
          <div
            onClick={handle_Update_user}
            className="Edit_Profile w-full    border p-2   lg:px-3  cursor-pointer  text-center top-0 rounded-[5px]
  transition-all duration-500
  bg-gradient-to-r from-black via-[#04062b] to-black
  bg-[length:200%_auto]  text-white  
  hover:bg-[position:right_center] hover:text-white  md:block md:text-md lg:text-[18px]  text-[14px] "
          >
            Edit Profile
          </div>

          <div
            className=" border  w-full p-2   lg:px-3 md:py-2   cursor-pointer  text-center top-0
  transition-all duration-500 rounded-[5px]
  bg-gradient-to-r from-black via-[#04062b] to-black
  bg-[length:200%_auto]  text-white  
  hover:bg-[position:right_center] hover:text-white  md:block md:text-md lg:text-[18px]  text-[14px]
     "
            onClick={handleCoverImage}
          >
            Set Cover Image
          </div>

          <div
            className=" border p-2 w-full lg:px-3 cursor-pointer  text-center top-0
  transition-all duration-500 rounded-[5px]
  bg-gradient-to-r from-black via-[#04062b] to-black lg:text-[18px]
  bg-[length:200%_auto]  text-white 
  hover:bg-[position:right_center] hover:text-white  md:block md:text-md text-[14px] "
            onClick={handleProfilePicture}
          >
            Set Profile Picture
          </div>
        </div>

        <div className="user_Details flex gap-1 flex-col relative top-4 xs:top-0">
          <h1 className="text-xl md:text-3xl font-bold ">{user.fullName}</h1>
          <p className="text-xl text-slate-400">@{user.username}</p>
        </div>

        {user.bio && <p className="description ">{user.bio}</p>}

        <div className="address flex gap-3 flex-col 2xl:flex-row">
          {user.location && (
            <p className="address flex gap-2">
              <MapPin className="text-slate-500" />
              <span>{user.location}</span>
            </p>
          )}
          {user.website && (
            <a
              href={`${user.website}`}
              target="_blank"
              className="text-blue-600 flex gap-2"
            >
              <Link className="text-slate-500" />
              {user.website}
            </a>
          )}

          {user.dateOfBirth && (
            <p className="address flex gap-1">
              {" "}
              <CalendarDays className="text-slate-500" />
              <span>{`${day} ${month} ${year}`}</span>
            </p>
          )}
        </div>
        <div className="flex gap-5">
          <NavLink
            to={"/followers"}
            state={{ followers: userFollowers }}
            className="hover:underline text-slate-700 text- font-semibold "
          >
            Followers -:-{" "}
            <span className="text-white cursor-pointer">
              {userFollowers?.length}
            </span>
          </NavLink>
          <NavLink
            to={"/following"}
            state={{ followers: userFollowedUser }}
            className="hover:underline text-slate-700 text- font-semibold "
          >
            Following -:-
            <span className="text-white cursor-pointer">
              {" "}
              {userFollowedUser?.length}
            </span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default User_DashBoard_Details;
