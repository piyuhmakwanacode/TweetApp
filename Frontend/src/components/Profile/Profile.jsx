import React from "react";
import SignUp_image from "../../assets/register_image.jpg";
import User_DashBoard_Details from "../User_DashBoard_Details/User_DashBoard_Details.jsx";
import Dashboard_Background_Image from "../../assets/Dashboard_BackGroung_Image.png";

const Profile = ({ className, user }) => {
  return (
    <div className={className}>
      <div className="images border-b border-t h-110 relative">
        <div className="coverImage absolute size-full bg-black">
          {" "}
          <img
            src={user.coverImage ? user.coverImage : Dashboard_Background_Image}
            className="size-full border-none"
            alt=""
          />
        </div>
        <div className="profilePicture absolute -bottom-9  lg:-bottom-12 ml-2 md:ml-10 h-24 w-24 lg:w-27 lg:h-27 xl:w-36 xl:h-36 rounded-full overflow-hidden border-3   bg-[#0c0f0e] text-slate-700 flex justify-center items-end ">
          {user.profilePicture ? (
            <img src={user.profilePicture} className="size-full object-fit" />
          ) : (
            <i className="fa-solid fa-user className='size-full rounded-full border-none object-contain text-[58px] lg:text-[50px] xl:text-[70px]  md:text-[55px]"></i>
          )}
        </div>
      </div>
      <User_DashBoard_Details
        className={"p-[45px_30px] flex gap-5 flex-col relative"}
        user={user}
      />
    </div>
  );
};

export default Profile;
