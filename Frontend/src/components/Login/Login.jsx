import axios from "axios";
import { Link, useNavigate } from "react-router";
import { AtSign, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { useEffect, useState } from "react";
import Popup from "../PopUp/popUp.jsx";
import SignIn_image from "../../assets/Login_image.jpg";
import { useDispatch } from "react-redux";
import { StoreUser } from "../../app/Store/Features/userSlice.js";

const Login = () => {
    const dispatch = useDispatch()
  const [Toggel_password, setToggel_password] = useState(false);
  const [field, setfield] = useState("");
  const [password, setPassword] = useState("");
  const [errors, seterrors] = useState(null);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();

  const changePassword = () => setToggel_password(!Toggel_password);

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const isEmail = field.includes("@");
      const payload = {
        ...(isEmail ? { email: field } : { username: field }),
        password,
      };

      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        payload,
        {
          withCredentials: true,
        }
      );

      const data = response.data.message;

      console.log(response.data.data);
      setPopup({ show: true, message: data, type: "success" });

      localStorage.setItem("user", JSON.stringify(response.data.data));
      const user = localStorage.getItem("user");
      dispatch(StoreUser(JSON.parse(user)));

      navigate("/");
    } catch (error) {
        console.log(error)
      setPopup({
        show: true,
        message: error.response.data.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="mx-auto  relative h-screen w-[]">
        <img
          src={SignIn_image}
          className="absolute inset-0 h-full w-full "
          alt="Login"
        />

        <div className="absolute inset-0 bg-black80 flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-md sm:max-w-lg bg-transparent space-y-6 p-4 sm:p-6 md:p-8">
            <div className="text-white text-center flex flex-col gap-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Sign In
              </h2>
              <p className="text-gray-400 text-base sm:text-lg">
                Welcome back. Please log in.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handelSubmit}>
              {/* Email Input */}
              <div className="relative w-[100%]">
                <AtSign className="absolute left-4 top-6.5 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Username or Email"
                  className="w-full bg-transparent text-white border border-gray-700 rounded-full py-5 pl-12 pr-4 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={field}
                  autoComplete="username"
                  onChange={(e) => setfield(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative w-[100%]">
                {Toggel_password ? (
                  <LockKeyholeOpen
                    className="absolute left-4 top-[1.39rem]  w-6 h-6 text-gray-400 cursor-pointer"
                    onClick={changePassword}
                  />
                ) : (
                  <LockKeyhole
                    className="absolute left-4 top-[1.39rem]  w-6 h-6 text-gray-400 cursor-pointer"
                    onClick={changePassword}
                  />
                )}
                <input
                  type={Toggel_password ? "text" : "password"}
                  required
                  placeholder="Password"
                  className="w-full bg-transparent text-white border border-gray-700 rounded-full py-5 pl-12 pr-4  sm:text-lg focus:outline-none focus:ring-2 focus:ring-slate-500 md:text-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <div className="ml-4 ">
                <Link
                  to={"/changePassword"}
                  className="text-slate-400 md:text-lg font-bold "
                >
                  Forget Password ?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-[100%] py-4 uppercase text-white rounded-full bg-[linear-gradient(to_right,_#16222A_0%,_#3A6073_51%,_#16222A_100%)] bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 md:md:text-xl"
              >
                Sign In
              </button>

              {/* Create Account Button */}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-[100%] py-4 uppercase text-white rounded-full bg-[linear-gradient(to_right,_#01344a_0%,_#434343_51%,_#01344a_100%)] bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 md:text-xl"
              >
                Create a New Account
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Popup Notification */}
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

export default Login;
