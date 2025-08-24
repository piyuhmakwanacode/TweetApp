import { useState, useEffect } from "react";
import SignUp from "./components/signUp/SignUp";
import Login from "./components/Login/Login";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import axios from "axios";
import Main from "./components/Main/Main.jsx";
import Popup from "./components/PopUp/popUp.jsx";
import Page_note_found from "./components/PageNotFound/Page_note_found.jsx";
import Search from "../src/components/search/Search.jsx";
import Layout from "./components/Layout/Layout.jsx";
import SetCoverImage from "./components/SetCoverImage/SetCoverImage.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import UpdateUser from "./components/Update_User_Details/UpdateUser.jsx";
import UpdatePassword from "./components/updatePassword/UpdatePassword.jsx";
import SetProfilePicture from "./components/Set_Profile_Picture/SetProfilePicture.jsx";
import { useDispatch, useSelector } from "react-redux";
import { StoreUser } from "./app/Store/Features/userSlice.js";
import AddPost from "./components/Posts/AddPost/AddPost.jsx";
import Messages from "./components/Messages/Messages.jsx";
import Followers from "./components/Followers/Followers.jsx";
import Following from "./components/Following/Following.jsx";
import PosterPage from "./components/PosterPage/PosterPage.jsx";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopUp, setshowPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true,
        });
             localStorage.setItem("user", JSON.stringify(response.data.data));

        const user = localStorage.getItem("user");
        dispatch(StoreUser(JSON.parse(user)));
        navigate("/");

      } catch (error) {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/users/refresh",
            {
              withCredentials: true,
            }
          );

          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data.data));

          const user = localStorage.getItem("user");

          dispatch(StoreUser(JSON.parse(user)));
          navigate("/");
        } catch (error) {
          navigate("/new");
          console.log(error);
        }
         } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const addPostStatus = useSelector((state) => state.addPostSlice.Addpost); // Call at top level

  useEffect(() => {
    localStorage.setItem("showPost", JSON.stringify(addPostStatus));
  }, [addPostStatus]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/new");
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        dispatch(StoreUser(parsedUser));
      } else {
        navigate("/new");
      }
    } catch (error) {
      console.error("Error parsing user JSON:", error);
      navigate("/new");
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div
        role="status"
        className="h-[100vh] w-full flex justify-center items-center gap-5"
      >
        <svg
          aria-hidden="true"
          className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only h-full w-full"></span>
        <div className="text-3xl">Loading...</div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/updateUser" element={<UpdateUser />} />
          <Route path="/SetCoverImage" element={<SetCoverImage />} />
          <Route path="/SetProfilePicture" element={<SetProfilePicture />} />
          <Route path="/followers" element={<Followers />}></Route>
          <Route path="/following" element={<Following />}></Route>
          <Route index element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard/:username" element={<Dashboard />} />
          <Route path="/tweetMessages" element={<Messages />} />
        </Route>
        <Route path="/new" element={ <PosterPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/changePassword" element={<UpdatePassword />} />
        //& <Route path="/*" element={<Page_note_found />}></Route> is allways
        set at the end of routing
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/*" element={<Page_note_found />}></Route>
      </Routes>

   
    </>
  );
}

export default App;
