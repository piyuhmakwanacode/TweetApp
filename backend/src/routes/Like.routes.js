import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middelware.js";
import {
  getlikedComment,
  getlikedTweets,
  toggelCommentLike,
  toggelTweetLike,
  userLikedTweet,
} from "../controllers/LIke.controller.js";

const router = Router();

router.route("/toggelLikeTweets/:tweetId").post(verifyJWT, toggelTweetLike);

router.route("/getlikedTweet").get(verifyJWT, getlikedTweets);
router.route("/checkLiked/:tweetId").get(verifyJWT, userLikedTweet);

router
  .route("/toggelCommentlike/:commentId")
  .post(verifyJWT, toggelCommentLike);

router.route("/checkUserLikeComment/:commentId").get(verifyJWT, getlikedComment)
  
export default router;
