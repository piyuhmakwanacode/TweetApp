import React from "react";
import { useLocation } from "react-router";
import FollowingUserCard from "../FollowingUserCard/FollowingUserCard.jsx";

const Followers = ({ followers }) => {
  const location = useLocation();
  const user = location.state.followers;

  return (
    <div className="border h-[100vh] w-full md:w-[80%] mx-auto space-y-2 ">
      <header className="h-12 w-full border-b flex justify-center items-center text-2xl text-cyan-700">
        -:- Followers -:-
      </header>
      <div className="flex flex-col gap-1">
        {user.length > 0 ? (
          <>
            {user.map((follow) => (
              <FollowingUserCard follower={follow} />
            ))}
          </>
        ) : (
          <>
            {" "}
            <div className="text-3xl flex justify-center items-center w-full h-60 text-slate-700">
              There are no followers.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Followers;
