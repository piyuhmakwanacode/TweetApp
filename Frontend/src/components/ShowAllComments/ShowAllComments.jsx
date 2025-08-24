import axios from "axios";
import { EllipsisVertical, ThumbsUp, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ReplyInput from "../ReplyInput/ReplyInput";
import ShowAllReplys from "../ShowAllReplys/ShowAllReplys";

const ShowAllComments = ({ comment, setshowComments, tweetId }) => {
  const userref = useRef();

  const [liked, setliked] = useState(false);
  const [likes, setlikes] = useState(comment?.Likes || 0);
  const [blink, setBlink] = useState(false);
  const [delComment, setDelComment] = useState(false);
  const [replys, setReplys] = useState(false)
  const [allReplys, setAllReplys] = useState([])
  const [showAllReplys, setShowAllReplys] = useState(false)
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.current_User);

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

  useEffect(() => {
    if (!delComment) return;
    const deleteComment = async () => {
      try {
        await axios.delete(
          `http://localhost:3000/api/comment/deleteComment/${comment._id}/${tweetId}`,
          { withCredentials: true }
        );
        setshowComments(true);
      } catch (error) {
        console.log(error);
        setshowComments(false);
      }
    };
    deleteComment();
  }, [delComment]);

  const isUserLikeComment = async (commentId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/like/checkUserLikeComment/${commentId}`,
        { withCredentials: true }
      );

      return response.data.data.userLiked;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const isuserLike = await isUserLikeComment(comment._id);

      if (isuserLike) {
        setliked(true);
      }
    })();
  }, [location.pathname]);

  const handleNavigate = () => {
    navigate("/dashboard", { state: comment.CommentOwner?.username });
  };

  const handleUndeline = () => {
    userref.current.className =
      " bg-cyan-800 h-[2px] w-[90%] transition-all duration-300";
  };

  const handelDefaultUnderLine = () => {
    userref.current.className =
      " bg-cyan-800 h-[2px] w-[0%] transition-all duration-300";
  };
  const handelLikes = async () => {
    setliked(!liked);

    setlikes((prev) => (liked ? prev - 1 : prev + 1));
    try {
      await axios.post(
        `http://localhost:3000/api/like/toggelCommentlike/${comment._id}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handelBlink = () => {
    setBlink((prev) => !prev);
  };

  const deleteComment = async () => {
    setDelComment(true);
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
      return num.toString();
    }
  }

  const handleReplys = async () => {
    setReplys((prev) => !prev)
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#000207] text-white p-4 border-b border-gray-800 space-y-3 ">
      <div className="flex gap-10  items-center relative">
        <div className="user Profile h-12 w-12">
          <img
            src={comment?.CommentOwner?.profilePicture}
            className="size-full rounded-full object-cover"
            alt="user"
          />
        </div>
        <div className="user">
          {" "}
          <h1
            className="text-slate-600 text-[14px] md:text-xl cursor-pointer  "
            onClick={handleNavigate}
            onMouseEnter={handleUndeline}
            onMouseLeave={handelDefaultUnderLine}
          >
            @{comment?.CommentOwner?.username}
          </h1>
          <div
            className="bg-red-700 h-[2px] w-[0%] transition-all duration-300"
            ref={userref}
          ></div>
          <p className="fullName text-slate-600">
            {comment?.CommentOwner?.fullName}
          </p>
        </div>
        <div className="cretead at text-slate-400 text-[12px] md:text-[16px]">
          {" "}
          {getRelativeTime(comment.createdAt)}
        </div>
        <div
          className="h-9 w-9 rounded-full absolute right-5 flex justify-center items-center cursor-pointer transition-all duration-400  hover:bg-[#0c1816]"
          onClick={handelBlink}
        >
          {" "}
          <EllipsisVertical className="size-[80%] text-cyan-400  " />
        </div>

        {blink &&
          (user?._id?.toString() === comment?.CommentOwner?._id?.toString() ? (
            // ✅ Show delete
            <div
              className="border absolute right-0 top-11 bg-black rounded-md p-3 flex gap-2 items-center justify-center cursor-pointer hover:bg-[#060d0e] transition-all duration-300"
              onClick={deleteComment}
            >
              <Trash2 /> delete
            </div>
          ) : (
            <div className="border absolute right-0 top-11 bg-black rounded-md p-3 flex gap-2 items-center justify-center transition-all duration-300">
              Not your comment
            </div>
          ))}
      </div>
      <div className="info flex flex-col gap-2">
        <p>{comment?.content}</p>
        <div className="flex items-center justify-between">
          <div className="likes h-10 w-10 flex gap-2 justify-center items-center">
            <ThumbsUp
              className={`size-full cursor-pointer ${liked ? "" : "hover:stroke-[#d13667]"
                }
          transition-all duration-200`}
              fill={liked ? "#d13667" : "none"}
              onClick={handelLikes}
            />{" "}
            <p>{formatNumber(likes)}</p>
          </div>
          <div className="reply">
            <button className="text-cyan-800 hover:text-blue-800 transition-all duration-300 font-bold border px-3 py-1 rounded-xl cursor-pointer" onClick={handleReplys}>reply</button>
          </div>
        </div>
      </div>


      <div className={`border w-full overflow-auto custom-scroll transition-h duration-300  ${!replys ? " hidden" : "h-40"}`}>
        <ReplyInput comment={comment} /> 
      <div className="   border-b-4  border-dotted border-red-700 w-[80%] mx-auto my-1"></div>
        {replys?.lengh > 0 ? (<> <h1 className="text-2xl flex justify-center items-center w-full h-18 text-slate-700 ">Their is no reply have in this comment</h1></>) : (<ShowAllReplys replys={replys} setShowAllReplys={setShowAllReplys} />)}

      </div>


    </div>
  );
};

export default ShowAllComments;
