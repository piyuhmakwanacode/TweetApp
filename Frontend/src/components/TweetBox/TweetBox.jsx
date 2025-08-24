import { useEffect, useRef, useState } from "react";
import { Image, Film, UserRound } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import axios from "axios";

export default function TweetBox({ setShowUserTweet }) {
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const user = useSelector((state) => state.userSlice.current_User);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleImageClick = () => imageInputRef.current.click();
  const handleVideoClick = () => videoInputRef.current.click();

  const sendTweet = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("content", tweet);
    if (file) {
      formData.append("contentFile", file);
    }

    try {
      await axios.post(
        "http://localhost:3000/api/tweet/createTweet",
        formData,
        { withCredentials: true }
      );
      setShowUserTweet(true);
      setTweet(""); // Clear input
      setFile(null);
    } catch (error) {
      console.error("Tweet creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Proper useEffect to control Post button
  useEffect(() => {
    const shouldEnable = tweet.trim() !== "" || file;
    setIsDisabled(!shouldEnable);
  }, [tweet, file]);

  return (
    <div className="bg-black text-white p-4 border-b border-gray-800 w-full sticky top-14 z-50">
      <div className="flex gap-3 justify-center">
        <Link
          to={`/dashboard/${user?.username}`}
          className="w-12 h-12 border rounded-full overflow-hidden"
        >
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              className="size-full object-cover"
              alt="User profile"
            />
          ) : (
            <div className="rounded-full h-full w-full flex items-center justify-center bg-gray-800">
              <UserRound className="size-[80%] text-slate-500" />
            </div>
          )}
        </Link>

        <div className="flex-1 flex flex-col">
          <textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-transparent resize-none outline-none text-xs md:text-lg placeholder-gray-400"
            rows="4"
          />

          <div className="flex items-center w-full flex-wrap gap-2 justify-between mt-2">
            <div className="flex gap-2 text-blue-500 flex-wrap items-center">
              <div className="flex gap-2 items-center">
                <button onClick={handleImageClick}>
                  <Image className="w-5 h-5 md:w-6 md:h-6 hover:scale-110 transition duration-200" />
                </button>
                <p className="text-slate-600 text-xs md:text-sm">- Image</p>
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
                <p className="text-slate-600 text-xs md:text-sm">- Video</p>
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
      </div>
    </div>
  );
}
