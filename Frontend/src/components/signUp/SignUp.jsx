import { User, AtSign, Mail, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Popup from "../PopUp/popUp.jsx";
import axios from "axios";
import SignUp_image from "../../assets/register_image.jpg";
import { useDispatch } from "react-redux";
import { StoreUser } from "../../app/Store/Features/userSlice.js";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Toggel_password, setToggel_password] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onchangePassword = () => setToggel_password(!Toggel_password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          fullName,
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);

      localStorage.setItem("user", JSON.stringify(response.data.data));
      const user = localStorage.getItem("user");
      dispatch(StoreUser(JSON.parse(user)));
      navigate("/");
    } catch (error) {
      setPopup({
        show: true,
        message: error.response.data.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="relative h-screen">
        <img
          src={SignUp_image}
          className="absolute inset-0 h-full w-full object-cover"
          alt="Register"
        />
        <div className="absolute inset-0 bg-black/2 flex items-center justify-center px-6 sm:px-10">
          <div className="w-full max-w-2xl bg-transparent space-y-8 p-8 sm:p-10 md:p-12 rounded-xl">
            <div className="text-white text-center space-y-2">
              <h2 className="text-4xl sm:text-5xl font-bold">Sign Up</h2>
              <p className="text-gray-400 text-lg sm:text-xl">
                Create your account
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <label
                  htmlFor="fullName"
                  className="block text-slate-300 ml-6  mb-2 text-lg"
                >
                  Full Name :-
                </label>
                <User className="absolute left-4 top-14 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent text-white border border-gray-700 rounded-full py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-slate-300 mb-2 ml-6 text-lg"
                >
                  Email :-
                </label>
                <Mail className="absolute left-4 top-14 w-6 h-6 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-white border border-gray-700 rounded-full py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="username"
                  className="block text-slate-300 mb-2 ml-6 text-lg"
                >
                  Username :-
                </label>
                <AtSign className="absolute left-4 top-14 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent text-white border border-gray-700 rounded-full py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-slate-300 mb-2 ml-6 text-lg"
                >
                  Password :-
                </label>
                {Toggel_password ? (
                  <LockKeyholeOpen
                    onClick={onchangePassword}
                    className="absolute left-4 top-[55px] w-6 h-6 text-gray-400 cursor-pointer"
                  />
                ) : (
                  <LockKeyhole
                    onClick={onchangePassword}
                    className="absolute left-4 top-[55px] w-6 h-6 text-gray-400 cursor-pointer"
                  />
                )}
                <input
                  type={Toggel_password ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-white border border-gray-700 rounded-full py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 text-lg uppercase text-white rounded-full bg-[linear-gradient(to_right,_#01344a_0%,_#434343_51%,_#01344a_100%)] bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500"
              >
                Create Account
              </button>

              <button
                onClick={() => navigate("/login")}
                type="button"
                className="w-full py-4 text-lg bg-gray-300 text-black rounded-full font-semibold hover:bg-gray-200 transition cursor-pointer"
              >
                Sign In to My Account
              </button>
            </form>
          </div>
        </div>
      </div>

      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
        />
      )}
    </>
  );
};

export default SignUp;
