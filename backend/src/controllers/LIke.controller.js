import mongoose from "mongoose";
import { Like } from "../models/Like.models.js";
import { Tweet } from "../models/Tweet.models.js";
import { ApiError } from "../utils/Api_Error.js";
import { ApiResponse } from "../utils/Api_Response.js";
import { Async_handler } from "../utils/Asyn_Handler.js";
import { Comment } from "../models/Comments.model.js";

const toggelTweetLike = Async_handler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user._id;
  if (!tweetId) {
    throw new ApiError(400, "tweet is not exist");
  }

  console.log("userid :- ", userId);

  const TweetLike = await Like.findOne({
    tweet: tweetId,
    likeBy: userId,
  });

  if (TweetLike) {
    const unlikeTweet = await Like.deleteOne({
      tweet: tweetId,
      likeBy: userId,
    });

    const tweet = await Tweet.findByIdAndUpdate(tweetId, {
      $inc: { Likes: -1 },
    });

    if (!tweet || !unlikeTweet) {
      throw new ApiError(500, "something went wrong while unlike the tweet");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { liked: false }, "unlike the tweet successfully")
      );
  } else {
    const likeTweet = await Like.create({
      tweet: tweetId,
      likeBy: userId,
    });

    const tweet = await Tweet.findByIdAndUpdate(tweetId, {
      $inc: { Likes: 1 },
    });

    if (!likeTweet || !tweet) {
      throw new ApiError(500, "something went wrong while like the tweet");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, { liked: true }, "like the tweet successfully")
      );
  }
});

const getlikedTweets = Async_handler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "please provide the id .");
  }

  const likedTweet = await Like.aggregate([
    {
      $match: { likeBy: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "tweets",
        localField: "tweet",
        foreignField: "_id",
        as: "tweets",
        pipeline: [
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
        ],
      },
    },
    {
      $addFields: {
        tweets: {
          $first: "$tweets",
        },
      },
    },
    {
      $project: {
        tweets: 1,
      },
    },
  ]);

  if (!likedTweet || likedTweet.length == 0) {
    throw new ApiError(400, "user does not like any tweets");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, likedTweet, "get all liked tweets by users"));
});

const userLikedTweet = Async_handler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user._id;

  if (!tweetId) {
    throw new ApiError(
      400,
      "please provide the tweet Id to check user liked the tweet or not"
    );
  }

  const isUserLiked = await Like.findOne({
    tweet: tweetId,
    likeBy: userId,
  });

  if (!isUserLiked) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { like: false }, "user does not like this tweet")
      );
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, { like: true }, "user like this tweet"));
  }
});

const toggelCommentLike = Async_handler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  if (!commentId) {
    throw new ApiError(400, "please provide the comment id to toggel likes");
  }

  const commetIsLIked = await Like.findOne({
    comment: commentId,
    likeBy: userId,
  });

  if (commetIsLIked) {
    const disLikeComment = await Like.deleteOne({
      comment: commentId,
      likeBy: userId,
    });

    if (!disLikeComment) {
      throw new ApiError(500, "something went wrong while dislike the comment");
    }
    const decreaseLikeCount = await Comment.findByIdAndUpdate(commentId, {
      $inc: { Likes: -1 },
    });

    if (!decreaseLikeCount) {
      throw new ApiError(
        500,
        "something went wrong while decreasing the like count"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "comment dislike successfully"));
  } else {
    const createLike = await Like.create({
      comment: commentId,
      likeBy: userId,
    });

    if (!createLike) {
      throw new ApiError(
        500,
        "something went wrong while adding like in comment"
      );
    }

    const increasingLikeCount = await Comment.findByIdAndUpdate(commentId, {
      $inc: { Likes: 1 },
    });

    if (!increasingLikeCount) {
      throw new ApiError(
        500,
        "something went wrong while increasing like count"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "like comment successfully"));
  }
});

const getlikedComment = Async_handler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  const IsUserLikedComment = await Like.findOne({
    comment: commentId,
    likeBy: userId,
  });

  console.log(IsUserLikedComment)

  if (IsUserLikedComment === null) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { userLiked: false },
          "user not give  like this comment"
        )
      );
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { userLiked: true },
          "user give like this comment"
        )
      );
  }
});

export { toggelTweetLike, getlikedTweets, userLikedTweet, toggelCommentLike ,getlikedComment };
