import Router from "express";
import { verifyJWT } from "../middlewares/auth.middelware.js";
import { upload } from "../middlewares/multer.middelware.js";
import {
  createTweet,
  deleteTweet,
  getAllUsersTweets,
  getTweetByid,
  getTweetsbyUsername,
  getUsersTweetMedia,
  getUserTweet,
} from "../controllers/Tweet.controller.js";

const router = Router();

router
  .route("/createTweet")
  .post(verifyJWT, upload.single("contentFile"), createTweet);

router
  .route("/getTweetyUserName/:username")
  .get(verifyJWT, upload.none(), getTweetsbyUsername);

router
  .route("/getallUsersTweets")
  .get(verifyJWT, upload.none(), getAllUsersTweets);

router.route("/:ownerId").get(verifyJWT, upload.none(), getUserTweet);

router.route("/getTweetbyId/:tweetId").get(verifyJWT, getTweetByid);

router
  .route("/deleteTweet/:tweetId")
  .delete(verifyJWT, upload.none(), deleteTweet);

router.route("/getTweetMidea/:ownerId").get(verifyJWT, getUsersTweetMedia);
export default router;
