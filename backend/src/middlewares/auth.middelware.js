import { Async_handler } from "../utils/Asyn_Handler.js";
import { ApiError } from "../utils/Api_Error.js";

import { User } from "../models/User.models.js";
import jwt from "jsonwebtoken";

export const verifyJWT = Async_handler(async (req, res, next) => {

  const token = req.cookies?.accessToken;


  if (!token || token === undefined) {
    throw new ApiError(400, "unAuthorized equest");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decodedToken) {
    throw new ApiError(
      500,
      "something went wong while getting user from token"
    );
  }

  const user = await User.findById(decodedToken._id);

  if (!user) {
  // delete cookies if you want
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.status(401).json({ message: "User not found" });
}
  req.user = user;
  next();
});
