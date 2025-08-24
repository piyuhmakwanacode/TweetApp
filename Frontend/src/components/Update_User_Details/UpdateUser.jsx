import React, { useState } from "react";
import backgroundImage from "../../assets/BackGround_Image.jpg";
import axios from "axios";
import { useNavigate } from "react-router";

const UpdateUserPage = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    bio: "",
    location: "",
    dateOfBirth: "",
    website: "",
  });

  const [bioWordCount, setBioWordCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "bio") {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount <= 160) {
        setFormData({ ...formData, [name]: value });
        setBioWordCount(wordCount);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/updateUser",
        formData,
        { withCredentials: true }
      );
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      const user = localStorage.getItem("user");
      const userData = JSON.parse(user);
      setTimeout(() => {
        navigate("/dashboard", { state: { userData } });
      }, 800);
    } catch (error) {
      setErrors(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-full w-full flex items-center justify-center bg-cover bg-center bg-no-repeat border-l"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full h-full bg-[#180f4131] shadow-2xl p-12 space-y-10 text-white"
      >
        <h1 className="text-4xl font-bold text-center mb-10">
          Update Your Profile
        </h1>
        <div className="flex flex-col  gap-10 w-full !grid-cols-1">
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* Username */}
            <div className="flex flex-col w-full">
              <label className="mb-2 ml-6 text-xl font-semibold">
                Username :-
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full bg-transparent text-white border border-gray-600 rounded-full py-5 pl-14 pr-6 text-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition duration-300"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col w-full">
              <label className=" ml-6 mb-2 text-xl font-semibold">
                Email :-
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@gmail.com"
                className="w-full bg-transparent text-white border border-gray-600 rounded-full py-5 pl-14 pr-6 text-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition duration-300"
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-10 lg:flex-row w-full ">
            <div className="flex flex-col w-full">
              <label className=" ml-6 mb-2 text-xl font-semibold ">
                Full Name :-
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="fullName"
                className="w-full bg-transparent text-white border border-gray-600 rounded-full py-5 pl-14 pr-6 text-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition duration-300"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col w-full">
              <label className=" ml-6 mb-2 text-xl font-semibold">
                Location :-
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="w-full bg-transparent text-white border border-gray-600 rounded-full py-5 pl-14 pr-6 text-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition duration-300"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col md:col-span-2">
            <label className=" ml-6 mb-2 text-xl font-semibold">Bio :-</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Write about yourself (max 160 words)"
              className="w-full bg-transparent text-white border border-gray-600 rounded-2xl py-5 px-6 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-700 transition duration-300"
            ></textarea>
            <div className="text-right text-sm text-gray-400 mt-1">
              {bioWordCount}/160 words
            </div>
          </div>

          {/* DOB */}
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex flex-col w-full">
              <label className=" ml-6 mb-2 text-xl font-semibold">
                Date of Birth :-
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full bg-transparent text-white border border-gray-600 rounded-full py-5 pl-14 pr-6 text-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition duration-300"
              />
            </div>

            {/* Website */}
            <div className="flex flex-col w-full">
              <label className=" ml-6 mb-2 text-xl font-semibold">
                Website :-
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="w-full bg-transparent text-white border border-gray-600 rounded-full py-5 pl-14 pr-6 text-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 text-center">
          {loading ? (
            <div className="text-center flex justify-center items-center h-full w-full gap-4 backdrop-blur-5xl bg-[#0d0923] p-2 rounded-xl cursor-no-drop disabled:bg-[#0d0923] ">
              <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-cyan-500 "></div>
              <h2 className="text-zinc-300  text-xl">Loading...</h2>
            </div>
          ) : (
            <button
              className="bg-gradient-to-r from-[#020308] via-[#043053] to-[#000000]
         bg-[length:200%_auto] bg-left hover:bg-right
         text-white text-center uppercase transition-all duration-500 block
         px-[45px] py-[20px] m-[10px] rounded-[10px] shadow-[1px_0_3px_#034b86] cursor-pointer mx-auto text-2xl"
            >
              Save Changes
            </button>
          )}
        </div>
        {errors && (
          <h1 className="text-[#8b0b0b] md:text-xl lg:text-2xl py-2 mx- w-full border text-center">
            {errors}
          </h1>
        )}
      </form>
    </div>
  );
};

export default UpdateUserPage;
