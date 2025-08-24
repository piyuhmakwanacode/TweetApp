import { Sidebar } from 'lucide-react';
import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../SideBar/SideBar.jsx';
import MainComp from '../MainComp/MainComp.jsx';
import { useSelector } from 'react-redux';
import AddPost from '../Posts/AddPost/AddPost.jsx';

const Layout = () => {
     const addPostStatus = useSelector((state) => state.addPostSlice.Addpost); 
 return (
  <div className="grid gap-[10px] w-full grid-cols-[1fr_3fr] relative">
   <SideBar className="sticky top-0  w-[90%]" more={""} />
   <div>
      {addPostStatus && <AddPost />}
    <Outlet />
     </div>
 
  </div>
 );
};

export default Layout;
