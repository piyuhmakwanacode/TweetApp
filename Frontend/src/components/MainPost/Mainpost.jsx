import React, { useEffect, useState } from "react";
import svgImg from "../../assets/react.svg";
import { MessageCircle, Heart, UserRound } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";

const Mainpost = ({ userTweet }) => {
  const navigate = useNavigate();
  const [likesCount, setLikesCount] = useState(userTweet?.Likes || 0);
  const [likes, setLikes] = useState(false);

  useEffect(() => {
    if (Object.keys(userTweet)?.length > 0) {
      isUserAllredyLike();
    }
  }, [location.pathname]);



  const toggelLikes = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/like/toggelLikeTweets/${userTweet._id}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
      const Islike = response.data.data.liked;
      if (Islike) {
        setLikesCount((prev) => prev + 1);
      } else {
        setLikesCount((prev) => prev - 1);
      }
      setLikes(response.data.data.liked);
    } catch (error) {
      console.log(error);
    }
  };

  const isUserAllredyLike = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/like/checkLiked/${userTweet._id}`,
        { withCredentials: true }
      );
      setLikes(response.data.data.like);
    } catch (error) {
      console.log(error);
    }
  };

  const imageTypes = ["jpg", "jpeg", "png", "gif", "webp"];
  const videoTypes = [
    "mp4",
    "webm",
    "ogg",
    "ogv",
    "mov",
    "avi",
    "mkv",
    "flv",
    "f4v",
    "wmv",
    "mpeg",
    "mpg",
    "3gp",
    "3g2",
    "m4v",
    "ts",
    "m2ts",
    "mts",
    "vob",
  ];

  function getFileType(file) {
    const ext = file.split(".").pop().toLowerCase();

    if (imageTypes.some((type) => ext === type)) return "image";
    if (videoTypes.some((type) => ext === type)) return "video";
    return "unknown";
  }

  const getRelativeTime = (createdAt) => {
    const now = new Date();
    const tweetTime = new Date(createdAt);
    const diffInSeconds = Math.floor((now - tweetTime) / 1000);

    if (diffInSeconds < 60)
      return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  };

  const handelMessages = () => {
    navigate("/tweetMessages", {
      state: userTweet?._id,
    });
  };

  function formatNumber(num) {
    if (num >= 1_000_000_000) {
      return (
        (Math.floor((num / 1_000_000_000) * 10) / 10)
          .toString()
          .replace(/\.0$/, "") + "b"
      );
    } else if (num >= 1_000_000) {
      return (
        (Math.floor((num / 1_000_000) * 10) / 10)
          .toString()
          .replace(/\.0$/, "") + "m"
      );
    } else if (num >= 1_000) {
      return (
        (Math.floor((num / 1_000) * 10) / 10).toString().replace(/\.0$/, "") +
        "k"
      );
    } else {
      return num;
    }
  }

  const navigateUsersDashboard = () => {
    navigate(`/dashboard/${userTweet?.owner?.username}`);
  };
  return (
    <div className="w-full mx-auto text-white p-4 border-b border-gray-800">
      {/* Header */}
      <div className="flex items-start gap-3 flex-wrap">
        {userTweet?.owner?.profilePicture.length > 0 ? (
          <img
            src={userTweet?.owner?.profilePicture}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="size-12 rounded-full border bg-[#080a17] flex justify-center items-end overflow-hidden">
            <UserRound className="size-[90%] text-slate-800" />
          </div>
        )}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span
              className="font-semibold hover:underline cursor-pointer"
              onClick={navigateUsersDashboard}
            >
              {userTweet?.owner?.fullName}
            </span>
            <span className="text-gray-400">
              @{userTweet?.owner?.username} ·{" "}
              {getRelativeTime(userTweet?.createdAt)}
            </span>
          </div>
          <p className="mt-1 text-sm leading-tight break-words">
            <br />
            {userTweet?.content}
            <br />
          </p>
        </div>
      </div>

      {/* Image */}
      <div
        className={`mt-3 rounded-xl overflow-hidden  border-slate-700 w-full sm:w-[90%] md:w-[80%] relative z-0   mx-auto ${
          userTweet?.tweetFile?.length == 0 ? "hidden" : ""
        }`}
      >
        {userTweet?.tweetFile?.length > 0 &&
          (() => {
            const fileType = getFileType(userTweet.tweetFile);

            if (fileType === "image") {
              return (
                <img
                  src={userTweet.tweetFile}
                  alt="tweets image"
                  className="w-full h-60 md:h-70 xl:h-100 border object-cover overflow-hidden"
                />
              );
            }

            if (fileType === "video") {
              return (
                <video
                  src={userTweet.tweetFile}
                  controls
                  className="w-full h-40 md:h-70 xl:h-100 object-cover"
                />
              );
            }
          })()}
      </div>

      {/* Reactions */}
      <div className="flex justify-between flex-wrap text-sm text-gray-400 mt-3 px-2 gap-y-2">
        <div
          className="flex items-center gap-2 hover:text-[#4345a1] hover:cursor-pointer font-bold p-2"
          onClick={handelMessages}
        >
          <MessageCircle className="w-4 h-4" />
          <span>{formatNumber(userTweet?.totalComments)}</span>
        </div>

        <div
          className="flex items-center gap-2 hover:text-[#457a8f] hover:cursor-pointer font-bold p-2"
          onClick={toggelLikes}
        >
          <Heart className="w-4 h-4" fill={likes ? "#fff" : "none"} />
          <span>{formatNumber(likesCount)}</span>
        </div>
      </div>
    </div>
  );
};

export default Mainpost;
