import Router from "express";
import { verifyJWT } from "../middlewares/auth.middelware.js";
import {
  addcommentOnTweet,
  deleteComment,
  getAllCommentsOnTweet,
} from "../controllers/Comment.controller.js";
import { upload } from "../middlewares/multer.middelware.js";

const router = Router();
router.use(upload.none());
router.route("/addComment/:tweetId").post(verifyJWT, addcommentOnTweet);
router.route("/deleteComment/:commentId/:tweetId").delete(verifyJWT, deleteComment);
router.route("/getAllComments/:tweetId").get(verifyJWT, getAllCommentsOnTweet);

export default router;
