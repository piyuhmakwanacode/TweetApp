import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Lastbar from "../LastBar/Lastbar.jsx";
import CommentInput from "../AddMessageComponent/AddMessageComponent.jsx";
import axios from "axios";
import ShowAllComments from "../ShowAllComments/ShowAllComments.jsx";
import { MessageSquareText } from "lucide-react";

const Messages = () => {
  const location = useLocation();
  const [tweet, setTweet] = useState({});
  const tweetId = location.state;
  console.log(tweetId)
  const [showComments, setshowComments] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (tweetId !== null) {
      (async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tweet/getTweetbyId/${tweetId}`,
          { withCredentials: true }
        );
        console.log(response.data);
        setTweet(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
   }
  }, [location.pathname]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/comment/getAllComments/${tweetId}`,
          { withCredentials: true }
        );
        const fetchedComment = response.data.data;
        setComments(fetchedComment);
        setshowComments(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location.pathname, showComments]);

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
  return (
    <>
      <div className="tweet w-full flex h-full  border-r">
        <div className="w-full border-t border-l border-r ">
          <header className=" z-50 h-14 border-b  flex justify-center items-center text-2xl text-cyan-500 font-bold sticky top-0 bg-black ">
            Tweet Messages
          </header>
          <div className="  bg-[#000000] border-b border-slate-100 ">
            {tweet && (
              <div className="w-full max-w-2xl mx-auto bg-black text-white p-4    border-gray-800 space-y-3">
                {/* Header */}
                <div className="flex items-start gap-3 bg-black z-50">
                  <img
                    src={tweet?.owner?.profilePicture}
                    alt="tweet owner"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-2 text-sm sm:text-base items-center flex-wrap">
                      <span className="font-semibold hover:underline">
                        {tweet?.owner?.fullName}
                      </span>
                      <span className="text-gray-400">
                        {tweet?.owner?.username} ·{" "}
                        {getRelativeTime(tweet?.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base mt-1">
                      {tweet?.content}
                    </p>
                  </div>
                </div>

                {/* Media */}
                <div className={`w-full rounded-2xl  overflow-hidden border border-gray-700 ${tweet?.tweetFile?.length ===0 ?"hidden" :""}`}>
                  {tweet?.tweetFile?.length > 0 &&
                    (() => {
                      const fileType = getFileType(tweet?.tweetFile);
                      if (fileType === "image") {
                        return (
                          <img
                            src={tweet.tweetFile}
                            alt="Tweet media"
                            className="w-full object-cover h-full max-h-[50vh]"
                          />
                        );
                      }
                      if (fileType === "video") {
                        return (
                          <video
                            src={tweet.tweetFile}
                            controls
                            className="w-full object-cover h-full max-h-[50vh]"
                          ></video>
                        );
                      }
                    })()}
                </div>
              </div>
            )}
          </div>

          <div className="allMessages  overflow-auto bg-[#000207] ">
            <h1 className="text-slate-600 text-xl font-semibold :- py-4  px-10 ">
              allMessages :-
            </h1>
            <hr className="w-[95%] flex items-center mx-auto" />
            {tweet && (
              <>
                <CommentInput tweet={tweet} setshowComments={setshowComments} />
              </>
            )}
            <div className="w-[95%] h-[1px] bg-cyan-600 mx-auto my-3 z-50"></div>
            {comments?.length > 0 ? (
              comments.map((comment) => (
                <ShowAllComments
                  key={comment._id}
                  comment={comment}
                  setshowComments={setshowComments}
                  tweetId={tweetId}
                />
              ))
            ) : (
              <div className="text-gray-600 italic text-xl mx-auto my-10 w-full text-center flex justify-center items-center gap-3">
                {" "}
                <MessageSquareText className="h-10 w-10 text-slate-800" /> No
                comments yet
              </div>
            )}
          </div>
        </div>
        <Lastbar />
      </div>
    </>
  );
};

export default Messages;
