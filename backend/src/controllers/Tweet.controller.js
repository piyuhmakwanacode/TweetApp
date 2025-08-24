import { Tweet } from "../models/Tweet.models.js";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/Api_Error.js";
import { ApiResponse } from "../utils/Api_Response.js";
import { Async_handler } from "../utils/Asyn_Handler.js";
import { Upload_On_Cloudinary } from "../utils/Cloudinary.js";
import mongoose from "mongoose";

const createTweet = Async_handler(async (req, res) => {
  const { content } = req.body;
  const userId = req.user._id;
  console.log(req.file);

  let content_File_Path;
  if (req.file && req.file?.path.length > 0) {
    content_File_Path = req.file.path;
  }

  console.log(content_File_Path);
  let Tweet_Content;
  if (content_File_Path) {
    Tweet_Content = await Upload_On_Cloudinary(content_File_Path);
  }

  console.log(Tweet_Content);

  const tweet = await Tweet.create({
    content: content,
    tweetFile: Tweet_Content?.url || "",
    Likes: 0,
    owner: userId,
  });

  const userTweet = await Tweet.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(tweet._id) } },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
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
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $project: {
        content: 1,
        tweetFile: 1,
        Likes: 1,
        owner: 1,
      },
    },
  ]);
  if (!userTweet || userTweet.length == 0) {
    throw new ApiError(
      500,
      "something went wrong while creating the tweet of user"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, userTweet[0], "data featch successfully"));
});

const getUserTweet = Async_handler(async (req, res) => {
  const { ownerId } = req.params;

  if (!ownerId) {
    throw new ApiError(
      400,
      "please provide the id so we can get the user tweets"
    );
  }

  const usersTweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(ownerId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              _id: 0,
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
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $project: {
        content: 1,
        tweetFile: 1,
        totalComments: 1,
        Likes: 1,
        owner: 1,
      },
    },
  ]);
  if (!usersTweets || usersTweets.length == 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "user not have any tweets"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, usersTweets, "usersTweets data fetach successfully")
    );
});

const deleteTweet = Async_handler(async (req, res) => {
  const { tweetId } = req.params;

  if (!tweetId) {
    throw new ApiError(
      400,
      "please provi dethe tweet is so that delete the tweet"
    );
  }

  const deletingTweet = await Tweet.findByIdAndDelete(tweetId);

  if (!deletingTweet) {
    throw new ApiError(500, "something went wrong while deleting the tweet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "delete the tweet successfully"));
});

const getAllUsersTweets = Async_handler(async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const allTweets = await Tweet.aggregate([
    { $skip: skip },
    { $limit: limitNumber },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "owner",
        as: "owner",
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
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $project: {
        content: 1,
        tweetFile: 1,
        owner: 1,
        Likes: 1,
        totalComments: 1,
        createdAt: 1,
      },
    },
  ]);

  if (!allTweets || allTweets.length == 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, null, "their no users tweets in this web app")
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, allTweets, "get the all users tweets successfully")
    );
});

const getTweetByid = Async_handler(async (req, res) => {
  const { tweetId } = req.params;

  if (!tweetId) {
    throw new ApiError(400, "tweet id not defind");
  }

  const tweet = await Tweet.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(tweetId) } },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "owner",
        as: "owner",
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
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $project: {
        content: 1,
        tweetFile: 1,
        owner: 1,
        createdAt: 1,
      },
    },
  ]);

  if (!tweet || tweet.length == 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "this tweet does not exist"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, tweet[0], "get the tweet successfully"));
});
const getUsersTweetMedia = Async_handler(async (req, res) => {
  const { ownerId } = req.params;
  const { limit = 10, page = 1 } = req.query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;
  const getUserMedia = await Tweet.aggregate([
    { $match: { owner: new mongoose.Types.ObjectId(ownerId) } },
    { $skip: skip },
    { $limit: limitNumber },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        tweetFile: 1,
      },
    },
  ]);

  if (!getUserMedia || getUserMedia.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "user does not have any media on tweets"));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, getUserMedia, "get all tweets media successfully")
    );
});

const getTweetsbyUsername = Async_handler(async (req, res) => {
  const { username } = req.params;
  const { page = 1, limit = 10 } = req.query;
console.log(username)
  const pageNumber = Number.parseInt(page);
  const limitNumber = Number.parseInt(limit);

  const skip = (pageNumber - 1) * limitNumber;
const users = await User.find({ username: { $regex: username, $options: "i" } });

  if (!users) {
    throw new ApiError(400, "this user not exist");
  }


  const userIds = users.map((user) => user._id);
  const allTweets = await Tweet.aggregate([
    { $match:  { owner: { $in: userIds } } },
        { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limitNumber },

    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "owner",
        as: "owner",
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
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $project: {
        content: 1,
        tweetFile: 1,
        owner: 1,
        Likes: 1,
        totalComments: 1,
        createdAt: 1,
      },
    },
  ]);

  console.log(allTweets)
  if (!allTweets || allTweets.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "use does not have any tweets"));
  }

  return res.status(200).json(
    new ApiResponse(200, allTweets,'fetch users tweets succesfully')
  );
});
export {
  createTweet,
  getUserTweet,
  deleteTweet,
  getAllUsersTweets,
  getTweetByid,
  getUsersTweetMedia,
  getTweetsbyUsername
};
