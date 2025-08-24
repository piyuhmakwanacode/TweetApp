import React from 'react';
import { useLocation } from 'react-router';
import FollowingUserCard from '../FollowingUserCard/FollowingUserCard.jsx';

const Following = () => {
  const location = useLocation();

  // Safe fallback: default to empty array if followers is undefined
  const followers = location?.state?.followers || [];
  console.log(followers)
 
  return (
    <div className="border h-[100vh] w-full md:w-[80%] mx-auto">
      <header className="h-12 w-full border-b flex justify-center items-center text-2xl text-cyan-700">
        -:- Followed Users -:-
      </header>

      {followers.length > 0 ? (
        <div className="p-4 space-y-4">
          {followers.map((follower) => (
            <FollowingUserCard key={follower._id} follower={follower} />
          ))}
          
        </div>
      ) : (
        <div className="text-3xl flex justify-center items-center w-full h-60 text-slate-700">
          There are no followers.
        </div>
      )}
    </div>
  );
};

export default Following;
