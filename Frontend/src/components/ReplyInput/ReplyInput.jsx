import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';

const ReplyInput = ({comment}) => {
 const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  const user = useSelector((state) => state.userSlice.current_User);

  const handleCancel = () => {
    setContent("");
    setIsFocused(false);
   inputRef.current.blur(); // Remove focus
  };

  const handleSubmit = async () => {
    try {
      console.log(content);
      await axios.post(
        `http://localhost:3000/api/comment/addComment/${comment._id}`,
        { content },
        { withCredentials: true }
      );
      setshowComments(true);
    } catch (error) {
      console.log(error);
      setshowComments(false);
    } finally {
      setIsFocused(false);
      setContent("");
    }
  };

  return (
    <div className="bg-[#000000] p-4 w-full mx-auto text-white">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full  flex items-center justify-center text-sm font-semibold border border-slate-700">
          <img
            src={user.profilePicture}
            className="h-full w-full rounded-full object-cover "
            alt=""
          />
        </div>

        {/* Input + actions */}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            ref={inputRef}
            value={content}

            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Add a content..."
            className="w-[99.5%] bg-transparent outline-none border-b py-3 border-cyan-400 placeholder-gray-400  text-sm md:text-[17px] indent-5"
          />

          {isFocused && (
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="text-sm text-blue-400 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={content.trim() === ""}
                  className={`text-sm px-4 py-1 rounded-full ${
                    content.trim()
                      ? "m-2 w-full px-[25px] py-[5px] text-center  transition-all duration-500 bg-gradient-to-r from-[#0b0116] via-[#0d2d55] to-[#051d34] bg-[length:200%_auto] shadow-[0_0_2px_#eee] rounded-[10px] block hover:bg-[position:right_center] hover:text-white hover:no-underline text-slate-600 "
                      : "bg-gray-900 text-gray-500 cursor-not-allowed m-2 w-full px-[25px] py-[5px] "
                  }`}
                >
                  Add Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReplyInput