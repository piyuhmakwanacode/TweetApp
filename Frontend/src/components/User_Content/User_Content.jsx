import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const User_Content = ({ className, MediaData, loadMedia }) => {
  const [Media, setMedia] = useState([]);
  const navigate = useNavigate();
const [emptyFile, setEmptyFile] = useState(false)
  const handelMessages = (tweetId) => {
    navigate("/tweetMessages", { state: tweetId });
  };

  const getMedia = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/tweet/getTweetMidea/${MediaData._id}`,
        { withCredentials: true }
      );
      setMedia(response.data.data);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  useEffect(() => {
    getMedia();

  }, [loadMedia]);

useEffect(() => {
  if (Media) {
    const allEmpty = Media.every((file) => file.tweetFile ==="");
  setEmptyFile(allEmpty);
 }
}, [Media]);

  return (
    <div
      className={`grid grid-cols-1 min-[426px]:grid-cols-2 md:grid-cols-3 gap-2 p-2 ${
        className || ""
      }`}
    >
      {emptyFile ? (<><h1 className=" h-[17.6vh] w-full text-3xl text-cyan-800 flex justify-center items-center col-span-full">
       all tweets have no Media files.
        </h1></>) : (<>
    {Media.length > 0 ? (
  Media.filter((tweet) => tweet.tweetFile && tweet.tweetFile.trim() !== "").map((tweet, idx) => {
    const file = tweet.tweetFile;
    return file.endsWith(".mp4") ? (
      <video
        key={idx}
        src={file}
        controls
        className="border h-44 w-full object-cover rounded-md cursor-pointer"
        onClick={() => handelMessages(tweet._id)}
      />
    ) : (
      <img
        key={idx}
        src={file}
        alt="Tweet media"
        className="border h-44 w-full object-cover rounded-md cursor-pointer"
        onClick={() => handelMessages(tweet._id)}
      />
    );
  })
) : (
  <h1 className="h-[17.6vh] w-full text-3xl text-cyan-800 flex justify-center items-center col-span-full">
    User does not have any tweet
  </h1>
)}
</>)}
     
     
    </div>
  );
};

export default User_Content;
