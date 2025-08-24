import Router from "express";
import { verifyJWT } from "../middlewares/auth.middelware.js";
import { upload } from "../middlewares/multer.middelware.js";
import {
  togglefollowes,
  getAllUsersfollowers,
  getAllusersFollowedChannel,
  checkUserSubScribeChannel,
} from "../controllers/Subscribe.controller.js";

const router = Router();

router
  .route("/ToggelFollowers/:channelId")
  .post(verifyJWT, upload.none(), togglefollowes);

router
  .route("/getUserfollowers/:channelId")
  .get(verifyJWT, upload.none(), getAllUsersfollowers);

router
  .route("/getuserFollowedChannel/:followerId")
  .get(verifyJWT, upload.none(), getAllusersFollowedChannel);

  router.route("/isFollowsChannel/:channelId").get(verifyJWT,upload.none(),checkUserSubScribeChannel)

export default router;
