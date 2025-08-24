import mongoose from "mongoose";
import { Subscription } from "../models/subScription.model.js";
import { ApiError } from "../utils/Api_Error.js";
import { ApiResponse } from "../utils/Api_Response.js";
import { Async_handler } from "../utils/Asyn_Handler.js";

const togglefollowes = Async_handler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user._id;

  if (!channelId) {
    throw new ApiError(400, "Please provide the channel ID");
  }

  const alreadyFollowing = await Subscription.findOne({
    channel: channelId,
    followers: userId,
  });

  if (alreadyFollowing) {
    const result = await Subscription.deleteOne({
      channel: channelId,
      followers: userId,
    });

    if (result.deletedCount === 0) {
      throw new ApiError(500, "Failed to unfollow the channel");
    }

    return res.status(200).json(
      new ApiResponse(200, null, "User unfollowed successfully")
    );
  }

  const follow = await Subscription.create({
    channel: channelId,
    followers: userId,
  });

  if (!follow) {
    throw new ApiError(500, "Failed to follow the channel");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User followed successfully"));
});


const checkUserSubScribeChannel = Async_handler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user._id;

  const isUserSubscribe = await Subscription.findOne({
    channel: channelId,
    followers: userId,
  });

  if (isUserSubscribe) {
    return res.status(200).json(
      new ApiResponse(200,{follow:true} ,'user is subbscribe this channel')
    );
  } else {
    return res.status(200).json(
      new ApiResponse(200, {follow:false},'user not subscribe this channel')
    );
  }
});

const getAllUsersfollowers = Async_handler(async (req, res) => {
  const {channelId} = req.params

  const getfollowers = await Subscription.aggregate([
    { $match: { channel: new mongoose.Types.ObjectId(channelId) } },
    {
      $lookup: {
        from: "users",
        localField: "followers",
        foreignField: "_id",
        as: "followers",
        pipeline: [
          {
            $project: {
              fullName: 1,
              username: 1,
              profilePicture: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        users_Followed_Channel: {
          $first: "$followers",
        },
      },
    },
    {
      $project: {
        users_Followed_Channel: 1,
      },
    },
  ]);

  if (!getfollowers || getfollowers.length == 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, getfollowers, "user does not have any followerss"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, getfollowers, "get users followerss successfully")
    );
});

const getAllusersFollowedChannel = Async_handler(async (req, res) => {
  const { followerId } = req.params;

  const userFollowedChannel = await Subscription.aggregate([
    {
      $match: {
        followers: new mongoose.Types.ObjectId(followerId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel", // this is the correct field
        foreignField: "_id",
        as: "users_Followed_Channel",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              fullName: 1,
              profilePicture: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        users_Followed_Channel: {
          $first: "$users_Followed_Channel",
        },
      },
    },
    {
      $project: {
       users_Followed_Channel:1
     }
   }
  ]);
console.log(userFollowedChannel)
  if (!userFollowedChannel || userFollowedChannel.length === 0) {
    return res.status(200).json(
      new ApiResponse(
        200,
        [],
        "User does not follow any other user"
      )
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      userFollowedChannel,
      "Followed users fetched successfully"
    )
  );
});

export { togglefollowes, getAllUsersfollowers, getAllusersFollowedChannel,checkUserSubScribeChannel };
