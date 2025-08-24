import { Link, useNavigate } from "react-router";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AddPost from "../Posts/AddPost/AddPost.jsx";
import { ToggelAddPost } from "../../app/Store/Features/addPostSlice.js";

const SideBar = ({ className,more }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showPost, setShowPost] = useState(false);
  const Logout_User = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/logOut",
        {
          withCredentials: true,
        }
      );

      if (response.status ===200) {
        navigate("/new")
      }
    } catch (error) {
    
    }
   
  };
  const user = useSelector((state) => state.userSlice.current_User);
  

  const handleAddPost = async () => {
    localStorage.setItem("showPost", JSON.stringify(true));

    const postStatus = localStorage.getItem("showPost");
    dispatch(ToggelAddPost(JSON.parse(postStatus)));
  };
const username = user.username

  return (
    <div className={`sm:sticky sm:top-0  fixed bottom-0 w-full flex z-[100] ${more} bg-[#080e13] h-14 px-4 sm:px-0`}>
      <div
        className={`sm:min-h-screen w-full md:w-[250px] flex sm:flex-col items-center justify-center sm:justify-start  sm:pt-6 gap-6
                  bg-transparent text-white ${className} `}
      >
        {/* Logo */}
        <div className="flex justify-center items-center hover:bg-[#181d18] transition duration-300 cursor-pointer rounded-full h-12 w-12">
          <i className="fa-brands fa-x-twitter text-3xl max-[373px]:text-[20px]"></i>
        </div>

        {/* Navigation Links */}
        <div className="flex sm:flex-col gap-5 w-full items-center">
          <Link
            to="/"
            className="w-11/12 md:w-40 flex justify-center items-center gap-3 hover:bg-[#181d18] rounded-3xl py-3 transition"
          >
            <i className="fa-solid fa-house text-[22px]  max-[373px]:text-[16px]"></i>
            <p className="text-[18px] md:text-[23px] max-[640px]:hidden">
              Home
            </p>
          </Link>

          <Link
            to="/search"
            className="w-11/12 md:w-40 flex justify-center items-center gap-3 hover:bg-[#181d18] rounded-3xl py-3 transition"
          >
            <i className="fa-solid fa-magnifying-glass text-[22px] max-[373px]:text-[16px]"></i>
            <p className="text-[18px] md:text-[23px]  max-[640px]:hidden">
              Search
            </p>
          </Link>

          <Link
            to={`/dashboard/${username}`}
            className="w-11/12 md:w-40 flex justify-center items-center gap-3 hover:bg-[#181d18] rounded-3xl py-3 transition"
     
          >
            <i className="fa-solid fa-user text-[22px] max-[373px]:text-[16px]"></i>
            <p className="text-[18px] md:text-[23px]  max-[640px]:hidden">
              Profile
            </p>
          </Link>
        </div>

        {/* Post Button */}
        <Link
          onClick={handleAddPost}
          className="relative inline-flex h-[46px] max-[373px]:h-[36px] w-11/12 max-[373px]:w-[160px] md:w-40 overflow-hidden rounded-full p-[2px] focus:outline-none"
        >
          <span
            className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
                        bg-[conic-gradient(from_90deg_at_50%_50%,#5edeff_0%,#c6419e_50%,#0469d6_100%)]"
          />
          <span
            className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full max-[373px]:px-2
                        bg-slate-950 hover:bg-slate-900 transition-all duration-600 sm:px-3 sm:py-2 font-medium text-white
                        text-[16px] md:text-xl backdrop-blur-3xl bg-gradient-to-r from-[#000000] via-[#07145ea2] to-[#000000]
                        bg-[length:200%_auto] bg-left hover:bg-right uppercase text-center gap-2"
          >
            <span className=" max-[640px]:hidden">Post</span>
            <i className="fa-solid fa-paper-plane hidden max-[550px]:inline text-xl max-[373px]:text-[16px] px-2"></i>
          </span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={Logout_User}
          className="w-11/12 max-[373px]:w-16 md:w-40 bg-gradient-to-r from-[#000000] via-[#0f0c42] to-[#000000]
                 bg-[length:200%_auto] bg-left hover:bg-right text-white text-center uppercase
                 transition-all duration-500 px-[25px] py-[12px] max-[373px]:px-[16px] max-[373px]:py-[10px] sm:mt-4 rounded-[10px]
                 shadow-[1px_0_3px_#034b86] cursor-pointer text-[16px] md:text-[18px]
                 flex items-center justify-center gap-3"
          style={{ backgroundPosition: "left center" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundPosition = "right center")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundPosition = "left center")
          }
        >
          <span className=" max-[640px]:hidden">Logout</span>
          <i className="fa-solid fa-right-from-bracket hidden max-[550px]:inline text-xl"></i>
        </button>
      </div>
      {showPost && (
        <AddPost
          showPost={showPost}
          setShowPost={setShowPost}
          onClose={() => setShowPost(false)}
        />
      )}
    </div>
  );
};

export default SideBar;
