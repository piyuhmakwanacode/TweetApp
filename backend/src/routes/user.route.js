import { Router } from "express";
import {
  login_user,
  refresh_Access_Token,
  register_User,
  check_Access_Token,
  logOut_User,
  update_User_Details,
  add_CoverImage,
  add_ProfilePicture,
  checkUser,
  checkOtp,
  changePassword,
  getUserDetails,
  getAllUser,
} from "../controllers/Users.controller.js";
import { upload } from "../middlewares/multer.middelware.js";
import { verifyJWT } from "../middlewares/auth.middelware.js";

const router = Router();

router.route("/me").get(check_Access_Token);
router.route("/refresh").get(refresh_Access_Token);

router.route("/register").post(upload.none(), register_User);
router.route("/login").post(upload.none(), login_user);
router.route("/logout").get(verifyJWT, logOut_User);

router.route("/updateUser").post(verifyJWT, upload.none(), update_User_Details);

router
  .route("/coverImage")
  .patch(verifyJWT, upload.single("coverImage"), add_CoverImage);
router
  .route("/profilePicture")
  .patch(verifyJWT, upload.single("profilePicture"), add_ProfilePicture);

//check email and update the password
  
router.route("/checkEmail").post(upload.none(),checkUser)

router.route("/checkOtp").post(upload.none(), checkOtp)

router.route("/changePassword").post(upload.none(), changePassword)

router.route("/getallUser").get(verifyJWT,getAllUser)
router.route("/:username").get(verifyJWT,upload.none(),getUserDetails)

export default router;


