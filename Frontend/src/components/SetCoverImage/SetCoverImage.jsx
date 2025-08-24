import React, { useEffect, useState } from "react";
import SideImage from "../../assets/SideImage.jpg";
import axios from "axios";
import Popup from "../PopUp/popUp.jsx";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { StoreUser } from "../../app/Store/Features/userSlice.js";
const SetCoverImage = () => {
  const [errors, setErrors] = useState("");
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handelCoverImage = async (e) => {
    e.preventDefault();
    if (!file) return setErrors("Please select a file");

    const formData = new FormData();
    formData.append("coverImage", file);

    setLoading(true);
    try {
      setErrors("");

      const response = await axios.patch(
        "http://localhost:3000/api/users/coverImage",
        formData,
        {
          withCredentials: true,
        }
      );
      setPopup({ show: true, message: response.data.message, type: "success" });
      localStorage.setItem("user", JSON.stringify(response.data.data));
      const user = localStorage.getItem("user");
      const userData = JSON.parse(user);
      setTimeout(() => {
        navigate("/dashboard", { state: userData });
      }, 800);
    } catch (error) {
      setErrors(error?.response?.data?.message);
      console.log(
        "error comes while updating the coverImage , Error :- ",
        error
      );
      console.log(errors);
    } finally {
      setLoading(false);
    }
  };

  const handelFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const texts = ["Your Profile is Your Vibe.\nUpdate Your Cover Image Now"];
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 10 : 50;

    const timer = setTimeout(() => {
      const updatedCharIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      setCharIndex(updatedCharIndex);
      setDisplayedText(currentText.substring(0, updatedCharIndex));

      if (!isDeleting && updatedCharIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
      } else if (isDeleting && updatedCharIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <div className="w-full h-[100vh] border relative flex justify-center items-center gap-32">
      <img src={SideImage} className="size-full absolute " alt="" />
      <h1 className="text-3xl font-semibold text-center animate-fade-in transition-all duration-500   z-50  w-[35%] text-cyan-400">
        {displayedText}

        <span className="animate-ping"> !</span>
      </h1>
      <form
        onSubmit={handelCoverImage}
        className=" w-110 flex flex-col justify-center items-center gap-7 right-40 border p-10  backdrop-blur-md rounded-xl"
      >
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex  items-center justify-center w-full h-24  border-gray-300 border rounded-lg cursor-pointer bg-transparent   "
          >
            <div className="flex items-center justify-around gap-10 pt-5 pb-6 g">
              <svg
                className="w-8 h-8  text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <div className="">
                {file ? (
                  <p className="mb-2 text-md text-gray-400 ">
                    <span className="font-semibold">{file.name}</span>
                  </p>
                ) : (
                  <>
                    <p className="mb-2 text-md text-gray-400 ">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-md text-gray-400 ">
                      SVG, PNG, JPG or GIF
                    </p>
                  </>
                )}
              </div>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handelFileChange}
            />
          </label>
        </div>
        {loading ? (
          <div className="text-center flex justify-center items-center h-full w-full gap-4 backdrop-blur-5xl bg-[#0d0923] p-2 rounded-xl cursor-no-drop disabled:bg-[#0d0923] ">
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-cyan-500 "></div>
            <h2 className="text-zinc-300  text-xl">Loading...</h2>
          </div>
        ) : (
          <button className="m-2 w-full px-[45px] py-[15px] text-center  transition-all duration-500 bg-gradient-to-r from-[#0b0116] via-[#0d2d55] to-[#051d34] bg-[length:200%_auto] text-white shadow-[0_0_2px_#eee] rounded-[10px] block hover:bg-[position:right_center] hover:text-white hover:no-underline ">
            Set Cover Image
          </button>
        )}
        {/*   */}

        {errors && (
          <h1 className="text-red-500 text-2xl z-50 absolute top-[120%]">
            {errors}
          </h1>
        )}
      </form>

      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
};

export default SetCoverImage;
