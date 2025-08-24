import React from "react";
import { BackgroundBeams } from "../../Backgorund/Background.jsx";
import { NavLink } from "react-router";

const PosterPage = () => {
  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center antialiased from-[#0f0b0b]">
      <div className="max-w-7xl mx-auto border gap-12 sm:gap-20 p-6 sm:p-10 lg:p-20 flex flex-col rounded-2xl bg-[#c6d5ff17] backdrop-blur-[2px] relative z-[40] overflow-hidden">
        
        {/* Top Glow */}
        <div className="h-32 w-32 border absolute left-[1%] bg-indigo-600 rounded-full blur-[6pc] top-[-8%]" />

        {/* Title */}
        <h1 className="relative z-10 text-2xl sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Connect. Share. Explore.
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
          {/* Register */}
          <NavLink to="/register" className="relative z-10 w-full sm:w-auto">
            <button className="group relative py-4 sm:py-5 px-8 sm:px-12 rounded-2xl backdrop-blur-xl border-2 border-indigo-500/30 bg-gradient-to-br from-cyan-900/40 via-black-900/60 to-black/80 shadow-2xl hover:shadow-indigo-500/30 hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-indigo-400/60 overflow-hidden w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-indigo-400/20 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-indigo-300/60 text-xl sm:text-2xl group-hover:text-indigo-200/80 transition-colors duration-300">
                Register
              </p>
            </button>
          </NavLink>

          {/* Login */}
          <NavLink
            to="/login"
            className="py-4 sm:py-5 px-8 sm:px-12 text-center text-xl sm:text-2xl transition-all duration-500 border bg-gradient-to-r from-[#16222A] via-[#3A6073] to-[#16222A] bg-[length:200%_auto] text-indigo-300/40 rounded-lg block hover:bg-[position:right_center] hover:text-indigo-200/80 hover:no-underline w-full sm:w-auto"
          >
            Login
          </NavLink>
        </div>

        {/* Bottom Glow */}
        <div className="h-32 w-32 border absolute right-[1%] bg-purple-600 rounded-full blur-[6pc] bottom-[-8%]" />
      </div>

      <BackgroundBeams />
    </div>
  );
};

export default PosterPage;
