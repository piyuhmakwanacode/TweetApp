import jwt from "jsonwebtoken";
import {
  Access_Token_options,
  Refresh_Token_options,
  User,
} from "../models/User.models.js";
import { ApiError } from "../utils/Api_Error.js";
import { ApiResponse } from "../utils/Api_Response.js";
import { Async_handler } from "../utils/Asyn_Handler.js";
import { Upload_On_Cloudinary } from "../utils/Cloudinary.js";
import { EmailSend } from "../utils/EmailSend.js";
import { Otp } from "../models/EmailOtp.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
const options = {
  httpOnly: true,
  secure: true,
};
const create_Access_Refresh_Token = async (userID) => {
  try {
    const user = await User.findById(userID);

    const accessToken = user.Create_Access_Token();
    const refreshToken = user.Create_Refresh_Token();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      `something went wrong while creating the access and refresh Token, Errors :- ${error}`
    );
  }
};

const check_Access_Token = Async_handler(async (req, res) => {
  const token = req.cookies?.accessToken;
  if (!token || token === undefined) {
    throw new ApiError(401, "user unAuthorized");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decodedToken || decodedToken === null) {
    throw new ApiError(400, "something went wrong while decodimg the token");
  }

  const user = await User.findById(decodedToken._id);

  if (!user) {
    // delete cookies if you want
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(401).json({ message: "User not found" });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "welcome to my website"));
});

const refresh_Access_Token = Async_handler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token || token === undefined) {
    throw new ApiError(401, "unauthorized request");
  }

  let decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  if (!decodedToken || decodedToken === null) {
    throw new ApiError(400, "something went wrong while decoding");
  }
  const user = await User.findById(decodedToken._id);

  if (token.toString() !== user.refreshToken.toString()) {
    throw new ApiError(401, "Refresh token is expired or used");
  }

  const { accessToken, refreshToken } = await create_Access_Refresh_Token(
    user?._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, Access_Token_options)
    .cookie("refreshToken", refreshToken, Refresh_Token_options)
    .json(new ApiResponse(200, user, "refresh the accesstokrn successfully"));
});

const register_User = Async_handler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  [fullName, username, email, password].some((field) => {
    if (field === "") {
      throw new ApiError(400, `register fields are empty`);
    }
  });

  const userAllredyExist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userAllredyExist) {
    throw new ApiError(400, "user allredy exist please provide new values");
  }

  const user = await User.create({
    fullName,
    username,
    email,
    password,
  });

  if (!user) {
    throw new ApiError(500, "something went wrog while createing user");
  }

  const { accessToken, refreshToken } = await create_Access_Refresh_Token(
    user._id
  );

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // const options = {
  //   httpOnly: true,
  //   secure: `${process.env.NODE_ENV}` === "production",
  //   sameSite: "Lax",
  //   maxAge: 1000 * 60 * 60 * 24, // 1 day
  // };

  // const options = {
  //   httpOnly: true,
  //   secure: `${process.env.NODE_ENV}` === "production",
  //   sameSite: "Lax",
  //   maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  // };

  return res
    .status(200)
    .cookie("accessToken", accessToken, Access_Token_options)
    .cookie("refreshToken", refreshToken, Refresh_Token_options)
    .json(new ApiResponse(200, createUser, "deta fetch successfully"));
});

const login_user = Async_handler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!(email || username)) {
    throw new ApiError(400, "please provide the email or username to login");
  }

  const user_Exist = await User.findOne({
    $or: [email ? { email } : null, username ? { username } : null].filter(
      Boolean
    ),
  });

  if (!user_Exist) {
    throw new ApiError(400, "user does not exist please register first");
  }

  const isPassword_true = await user_Exist.isPasswordCorrect(password);

  if (!isPassword_true) {
    throw new ApiError(400, "password is incorrect");
  }

  const { accessToken, refreshToken } = await create_Access_Refresh_Token(
    user_Exist._id
  );
  const user = await User.findById(user_Exist._id).select(
    "-password -refreshToken -__v"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, Access_Token_options)
    .cookie("refreshToken", refreshToken, Refresh_Token_options)
    .json(new ApiResponse(200, user, "user loggedIn successfully"));
});

const logOut_User = Async_handler(async (req, res) => {
  const userId = req.user._id;

  const existUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshToken: "",
      },
    },
    { new: true }
  );

  if (!existUser) {
    throw new ApiError(500, "something went wrong while logout the user");
  }

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, null, "logOut user successfully"));
});

const update_User_Details = Async_handler(async (req, res) => {
  const IsObjectEmpty = (obj) => {
    return Object.values(obj).every(
      (value) =>
        value === null ||
        value === undefined ||
        (typeof val === "string" && val.trim() === "")
    );
  };
  const allowedFields = [
    "username",
    "email",
    "fullName",
    "website",
    "bio",
    "dateOfBirth",
    "location",
  ];
  // const {
  //     username,
  //     email,
  //     fullName,
  //     coverImage,
  //     profilePicture,
  //     bio,
  //     website,
  //     dateOfBirth,
  //     location,
  //   } = req.body;

  if (IsObjectEmpty(req.body)) {
    throw new ApiError(400, "please provide the All fields not empty");
  }
  const userData = {};
  const userId = req.user._id;
  for (const field of allowedFields) {
    if (req.body[field]) {
      if (field === "dateOfBirth") {
        userData[field] = new Date(req.body[field]);
      } else {
        userData[field] = req.body[field];
      }
    }
  }

  const user = await User.findById(userId);

  for (const field of allowedFields) {
    const incoming = String(req.body[field])
      .trim()
      .split(" ")
      .join("")
      .toLowerCase();

    const existing = user[field]
      ? String(user[field]).trim().split(" ").join("").toLowerCase()
      : "";

    if (incoming !== "" && existing !== "" && incoming === existing) {
      throw new ApiError(
        400,
        `Please provide a new value for "${field}", this already exists.`
      );
    }
  }

  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: userData,
    },
    { new: true }
  ).select("-password -refreshToken");

  if (!updateUser) {
    throw new ApiError(500, "something went wrong while updating the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateUser, "userdata get successfully"));
});

const add_CoverImage = Async_handler(async (req, res) => {
  const coverImage_Local_Path = req.file?.path;

  const userId = req.user._id;
  if (!coverImage_Local_Path || coverImage_Local_Path === "") {
    throw new ApiError(
      400,
      "please provide the cover image for add our update"
    );
  }

  const coverImage = await Upload_On_Cloudinary(coverImage_Local_Path);

  if (!coverImage || coverImage.url == "") {
    throw new ApiError(
      500,
      "something went wrong while getting url from cloudinary"
    );
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(
      500,
      "something went wrong while updatingthe coverImage of user"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "Congratulations coverImage update successfully"
      )
    );
});

const add_ProfilePicture = Async_handler(async (req, res) => {
  const ProfilePicture_LocalPath = req.file?.path;
  const userId = req.user._id;

  if (!ProfilePicture_LocalPath || ProfilePicture_LocalPath == "") {
    throw new ApiError(
      400,
      "please provide the profile picture to set in your account"
    );
  }

  const ProfilePicture = await Upload_On_Cloudinary(ProfilePicture_LocalPath);

  if (!ProfilePicture || ProfilePicture.url == "") {
    throw new ApiError(
      500,
      "soemthing went wrong while getting ther profile picture from cloudinary"
    );
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        profilePicture: ProfilePicture.url,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(
      500,
      "something went wrong while update or add the Profile Picture in your account"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "Congratulations profile Picture update successfully"
      )
    );
});

const deleteUser = Async_handler(async (req, res) => {
  const { userId } = req.params;
  const userID = req.user._id;

  if (!userId) {
    throw new ApiError(400, "please provide user id to delete the account");
  }

  if (userId.toString() !== userID.toString()) {
    throw new ApiError(400, "you are not Authorized to delete this account");
  }

  const deleteUser = await User.findByIdAndDelete(userId);

  if (!deleteUser) {
    throw new ApiError(
      500,
      "something went wrong while deleting the User Accout"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "user Account delete successfully"));
});

//three controllers for password changing

// 1.check provided Email or username exist in our database .

const checkUser = Async_handler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(
      400,
      "please provide the email for checking its exist or not"
    );
  }
  const existUser = await User.findOne({ email: email });

  if (!existUser) {
    throw new ApiError(400, " Email does not exist.");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const EmailOtp = await Otp.create({
    otp: otp,
    email: email,
  });

  if (!EmailOtp) {
    throw new ApiError(
      500,
      "something went wrong while sending the otp to the email"
    );
  }

  await EmailSend(
    email.toString(),
    otp,
    "with this otp to change the password"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, null, "sending otp to the email successfully"));
});

const checkOtp = Async_handler(async (req, res) => {
  const { otp, email } = req.body;

  const existOtp = await Otp.findOne({ email: email });

  if (!existOtp) {
    throw new ApiError(400, "this email does not exist");
  }

  if (otp.toString() !== existOtp.otp.toString()) {
    await Otp.deleteMany({ email: email });
    throw new ApiError(400, "otp is incorrect please try again");
  }
  await Otp.deleteMany({ email: email });
  return res.status(200).json(new ApiResponse(200, null, "otp is correct"));
});

const changePassword = async (req, res) => {
  const { newPassword, email } = req.body;

  if (!newPassword || newPassword == "") {
    throw new ApiError(400, "please provide the password to change");
  }

  const user = await User.findOne({ email: email });

  if (user.password.trim().toString() === newPassword.trim().toString()) {
    throw new ApiError(
      400,
      "you provide the same password please provide uniq password"
    );
  }

  const IncriptPassword = await bcrypt.hash(newPassword, 10); //&  <--- *** this is imprtant step becouse we use in User model UserSchema.pre method only work in save() method ok so that  we incript the password mennually or don't use findByIdAndUpdate method. ***---->

  const updatePassword = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        password: IncriptPassword,
      },
    },
    { new: true }
  );

  if (!updatePassword) {
    throw new ApiError(
      500,
      "something went wrong while updating the passoword"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "password update successfully"));
};

const getUserDetails = Async_handler(async (req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, "please provide the username to get user details");
  }

  const user = await User.aggregate([
    { $match: { username: username } },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "followers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "followers",
        as: "channel",
      },
    },
    {
      $lookup: {
        from: "tweets",
        foreignField: "owner",
        localField: "_id",
        as: "postCount",
      },
    },
    {
      $addFields: {
        followers: {
          $size: "$followers",
        },
        subscribeTo: {
          $size: "$channel",
        },
        postCount: {
          $size: "$postCount",
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        email: 1,
        coverImage: 1,
        profilePicture: 1,
        location: 1,
        followers: 1,
        website: 1,
        dateOfBirth: 1,
        subscribeTo: 1,
        postCount: 1,
        bio: 1,
      },
    },
  ]);

  if (!user || user.length < 0) {
    throw new ApiError(400, "user not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user[0], "user details fetch successfully"));
});

const getAllUser = Async_handler(async (req, res) => {
  const users = await User.aggregate([
    { $sample: { size: 5 } }, // Get 5 random users
    {
      $project: {
        _id: 1,
        username: 1,
        fullName: 1,
        profilePicture: 1,
      },
    },
  ]);

  if (!users) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "in this app  does not have any user"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, users, "Fetched random users"));
});

export {
  register_User,
  refresh_Access_Token,
  login_user,
  check_Access_Token,
  logOut_User,
  update_User_Details,
  add_CoverImage,
  add_ProfilePicture,
  checkUser,
  checkOtp,
  changePassword,
  deleteUser,
  getUserDetails,
  getAllUser
};
