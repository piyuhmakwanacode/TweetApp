import React, { useEffect, useState } from "react";
import TweetBox from "../TweetBox/TweetBox.jsx";
import Mainpost from "../MainPost/Mainpost.jsx";
import MainHeader from "../MainHeader/MainHeader.jsx";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setRefreshTweets } from "../../app/Store/Features/addPostSlice.js";

const MainComp = () => {
  const [tweets, setTweets] = useState([]);
  const [showUserTweet, setShowUserTweet] = useState(false);
  const refreshTweets = useSelector((state) => state.addPostSlice.refreshTweets);

  const dispatch = useDispatch();
  const fetchTweets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tweet/getallUsersTweets",
        { withCredentials: true }
      );
      const fetchedTweets = response.data.data;
      setTweets(fetchedTweets);
      dispatch(setRefreshTweets(false));
      setShowUserTweet(false);
    } catch (error) {
      setShowUserTweet(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/" || refreshTweets) {
      fetchTweets();
    }
  }, [location.pathname, showUserTweet, refreshTweets]);

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.setItem("showTweets", JSON.stringify(false));
    }
  }, [location.pathname]);

  return (
    <>
      <div className="border border-slate-700 sm:w-[99%] relative z-0 min-h-[99.9vh] h-full w-[100vw]">
        <MainHeader
          className="border-b border-slate-700 h-14 sticky top-0 w-full  z-[110]
              "
        />
        <div className="">
          <TweetBox setShowUserTweet={setShowUserTweet} />
          <div className="">
            {tweets?.length > 0 ? (
              tweets.map((tweet) => {
                return <Mainpost key={tweet._id} userTweet={tweet} />;
              })
            ) : (
              <h1 className="flex justify-center items-center py-40 text-3xl text-slate-700 gap-2">
                {" "}
                <MessageCircle className="size-12" /> No Tweets Available
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComp;
