import React, { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import axios from "axios";
import LoaderGrid from "../Loader/Loader.jsx";
import MainPost from "../MainPost/Mainpost.jsx";
const Search = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
const [username, setUsername] = useState("")
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getallTweets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/tweet/getallUsersTweets`,
        { withCredentials: true }
      );
      const shuffledTweets = shuffleArray(response.data.data); // ⬅️ Shuffle here
      setTweets(shuffledTweets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUsersTweets = async () => {
    if (username.trim() === "") return;

    try {
      const response = await axios.get(`http://localhost:3000/api/tweet/getTweetyUserName/${username}?page=1&limit=10`,{withCredentials:true})
      console.log(response.data.data)
      setTweets(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (location.pathname === "/search" && username.trim()==="") {
      getallTweets();
    } else {
      getUsersTweets()
    }
  }, [location.pathname]);
  return (
    <>
      <div className="border h-full min-h-[99.98vh] w-[100vw] sm:w-[60vw] ">
        <header className="h-16 sm:h-24 border-b flex justify-center items-center w-full sticky top-0 backdrop-blur-3xl  z-[110]">
          <div className="border w-[80%] h-[70%] flex justify-between items-center rounded-2xl pr-10 bg-black  overflow-hidden  ">
            <input
              type="text"
              className="outline-none h-full w-[85%] indent-3 sm:text-2xl"
              placeholder="Search"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
            <button className="h-10 w-10 border flex justify-center items-center  rounded-full sm:size-14" onClick={getUsersTweets}>
              <SearchIcon className="  size-[50%]" />
            </button>
          </div>
        </header>
        <div className="">
          {tweets?.length > 0 ? (
            <>
              {tweets.map((tweet) => (
                <MainPost key={tweet._id} userTweet={tweet} />
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {loading && <LoaderGrid />}
    </>
  );
};

export default Search;
