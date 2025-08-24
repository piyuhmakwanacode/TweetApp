import { useEffect, useState } from "react";
import User_Content from "../User_Content/User_Content.jsx";
import axios from "axios";
import Mainpost from "../MainPost/Mainpost.jsx";

const User_Media = ({ userData }) => {
  console.log(userData);
  const [loadPost, setloadPost] = useState(true);
  const [loadMedia, setloadMedia] = useState(false);
  const [tweets, setTweets] = useState([]);
  const handle_Post = async () => {
    if (loadPost === false) {
      setloadPost(true);
      setloadMedia(false);
    }
  };
  const handle_Media = async () => {
    setloadMedia(true);
    setloadPost(false);
  };

  const getUserPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/tweet/${userData._id}`,
        { withCredentials: true }
      );
      setTweets(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      getUserPost();
    }
  }, [location.pathname]);
  return (
    <>
      <div className="User_post_head flex  h-16">
        <div
          className="border w-full  text-2xl h-full flex flex-col items-center justify-center gap-1 cursor-pointer"
          onClick={handle_Post}
        >
          <p className={`${loadPost ? "" : "text-slate-600"}`}>Post</p>{" "}
          <span
            className={`w-20 bg-blue-500 h-[6px]  rounded-full mx-auto z-50 ${
              loadPost ? "" : "hidden"
            }`}
          ></span>
        </div>
        <div
          className="border w-full  text-2xl h-full flex flex-col items-center justify-center gap-1 cursor-pointer"
          onClick={handle_Media}
        >
          <p className={`${loadMedia ? "" : "text-slate-600"}`}>Media</p>{" "}
          <span
            className={`w-20 bg-blue-500 h-[6px]  rounded-full mx-auto ${
              loadMedia ? "" : "hidden"
            }`}
          ></span>
        </div>
      </div>
      {loadPost && (
        <>
          {tweets?.length > 0 ? (
            <>
              {tweets?.map((tweet) => (
                <Mainpost key={tweet._id} userTweet={tweet} />
              ))}
            </>
          ) : (
            <>
              <h1 className="border h-[17.6vh] w-full text-3xl text-cyan-800 flex justify-center items-center">
                 user does not have any Posts
              </h1>
            </>
          )}
        </>
      )}

      {loadMedia && (
        <>
          {" "}
          {tweets?.length > 0 ? (
            <>
              {" "}
              <User_Content
                className={"border  w-full grid grid-cols-1 gap-1 p-1"}
                MediaData={userData}
                loadMedia = {loadMedia}
              />
            </>
          ) : (
            <>
              <h1 className="border h-[17.6vh] w-full text-3xl text-cyan-800 flex justify-center items-center">
                user does not have any Posts
              </h1>
            </>
          )}
        </>
      )}
    </>
  );
};

export default User_Media;
