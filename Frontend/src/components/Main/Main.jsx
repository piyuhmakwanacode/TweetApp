import React from "react";
import SideBar from "../SideBar/SideBar.jsx";
import MainComp from "../MainComp/MainComp.jsx";
import { Outlet } from "react-router";
import SubScription from "../Subscription/SubScription.jsx";
import Lastbar from "../LastBar/Lastbar.jsx";
import AddPost from "../Posts/AddPost/AddPost.jsx";
import { useSelector } from "react-redux";

const Main = () => {

  return (
    <div className="flex gap-[30px] w-full ">
      
      <MainComp />
      <Lastbar />
    </div>
  );
};

export default Main;
