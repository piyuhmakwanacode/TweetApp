import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Film, Image } from "lucide-react";
import axios from "axios";
import { setRefreshTweets, ToggelAddPost } from "../../../app/Store/Features/addPostSlice.js";

const AddPost = () => {
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const handleImageClick = () => imageInputRef.current.click();
  const handleVideoClick = () => videoInputRef.current.click();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleAddpost = () => {
    localStorage.setItem("showPost", JSON.stringify(false));
    const postStatus = localStorage.getItem("showPost");
    dispatch(ToggelAddPost(JSON.parse(postStatus)));
  };

  useEffect(() => {
    const shouldEnable = tweet.trim() !== "" || file;
    setIsDisabled(!shouldEnable);
  }, [tweet, file]);

  const sendTweet = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("content", tweet);
    if (file) {
      formData.append("contentFile", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/tweet/createTweet",
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
     dispatch(setRefreshTweets(true))
      }
      setTweet(""); // Clear input
      setFile(null);
      localStorage.setItem("showPost", JSON.stringify(false));
      const postStatus = localStorage.getItem("showPost");
      dispatch(ToggelAddPost(JSON.parse(postStatus)));
    } catch (error) {
      console.error("Tweet creation failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm ">
      <div className="relative w-full max-w-xl p-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg text-white">
        <button
          onClick={handleAddpost}
          className="absolute top-3 right-3 text-white text-xl hover:text-gray-300"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">What’s happening?</h2>
        <textarea
          className="w-full h-32 p-3 rounded-xl bg-white/5 border border-white/20 backdrop-blur-sm resize-none outline-none placeholder:text-white/50"
          placeholder="Write something..."
          value={tweet}
          onChange={(e) => {
            setTweet(e.target.value);
          }}
        ></textarea>
        <div className="flex gap-2 text-blue-500 flex-wrap items-center">
          <div className="flex gap-2 items-center">
            <button onClick={handleImageClick}>
              <Image className="w-5 h-5 md:w-6 md:h-6 hover:scale-110 transition duration-200" />
            </button>
            <p className="text-slate-600 text-xs md:text-xl">- Image</p>
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex gap-2 items-center">
            <button onClick={handleVideoClick}>
              <Film className="w-5 h-5 md:w-6 md:h-6 hover:scale-110 transition duration-200" />
            </button>
            <p className="text-slate-600 text-xs md:text-xl">- Video</p>
            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        {loading ? (
          <div className="flex gap-3 items-center px-6 py-2 bg-[#0d0923] rounded-xl text-zinc-300">
            <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
            <span>Posting...</span>
          </div>
        ) : (
          <button
            onClick={sendTweet}
            disabled={isDisabled}
            className={`bg-gradient-to-r from-[#086caa] via-[#0e2d91] to-[#003477] bg-[length:200%_auto] bg-left hover:bg-right text-white px-6 py-2 rounded-md shadow transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default AddPost;
