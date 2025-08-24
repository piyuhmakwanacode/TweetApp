import mongoose from "mongoose";
import { Comment } from "../models/Comments.model.js";
import { ApiError } from "../utils/Api_Error.js";
import { ApiResponse } from "../utils/Api_Response.js";
import { Async_handler } from "../utils/Asyn_Handler.js";
import { replyOnComment } from "../models/repleyOnComment.model.js";
import { User } from "../models/User.models.js";
import { Tweet } from "../models/Tweet.models.js";

const addcommentOnTweet = Async_handler(async (req, res) => {
  const { content } = req.body;
  const { tweetId } = req.params;
  const userId = req.user._id;

  if (!content) {
    throw new ApiError(
      400,
      "please provide the content of Comments that you want to show"
    );
  }

  if (!tweetId) {
    throw new ApiError(
      400,
      "please provide the tweet id that you want to comment "
    );
  }

  const addComment = await Comment.create({
    content: content,
    commentOn: tweetId,
    owner: userId,
  });

  const addTotalCommentCount = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $inc: { totalComments: 1 },
    },
    { new: true }
  );

  if (!addTotalCommentCount) {
    throw new ApiError(
      500,
      "something went wrong while increase comment count of tweets "
    );
  }

  if (!addComment) {
    throw new ApiError(
      500,
      "something went wrong while adding the comment on tweet"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "adding comment on tweet successfully"));
});

const deleteComment = Async_handler(async (req, res) => {
  const { commentId, tweetId } = req.params;
  const userId = req.user._id;

  if (!commentId || !tweetId) {
    throw new ApiError(400, "please provide comment id or tweet id not  empty");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(400, "this comment does not exist ");
  }

  if (userId.toString() !== comment.owner.toString()) {
    throw new ApiError(400, " you are not authorize  to delete this comment");
  }

  const delComment = await Comment.findByIdAndDelete(commentId);

  if (!delComment) {
    throw new ApiError(500, "something went wrong while deleting the comment");
  }

  const decreseTweetsCommentCount = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $inc: {
        totalComments: -1,
      },
    },
    { new: true }
  );
  if (!decreseTweetsCommentCount) {
    throw new ApiError(
      500,
      "something went wrong while decreasing he tweet comment count"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, null, "delete comment successfully"));
});

const getAllCommentsOnTweet = Async_handler(async (req, res) => {
  const { tweetId } = req.params;

  if (!tweetId) {
    throw new ApiError(
      400,
      "please provide the tweet id to get all comments on that "
    );
  }

  const allComments = await Comment.aggregate([
    {
      $match: { commentOn: new mongoose.Types.ObjectId(tweetId) },
    },
    {
      $lookup: {
        from: "tweets",
        localField: "commentOn",
        foreignField: "_id",
        as: "commentOn",
        pipeline: [
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
              contentFile: 1,
              owner: 1,
            },
          },
        ],
      },
    },
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
        TweetOwner: {
          $first: "$commentOn",
        },
        CommentOwner: {
          $first: "$owner",
        },
      },
    },
    {
      $project: {
        content: 1,
        TweetOwner: 1,
        CommentOwner: 1,
        Likes: 1,
        createdAt: 1,
      },
    },
  ]);

  if (!allComments || allComments.length == 0) {
    res
      .status(200)
      .json(new ApiResponse(200, null, "in this Tweet not have any comment"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, allComments, "fetch the tweets comment successfully")
    );
});

const addReplyOnComments = Async_handler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  if (!commentId || !content) {
    throw new ApiError(400, "please provide the field not empty");
  }

  const AddReply = await replyOnComment.create({
    content: content,
    Comment: commentId,
    replyOwner: userId,
  });
  if (!AddReply) {
    throw new ApiError(
      500,
      "something went wrong while adding comments on comments"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, null, "adding comments on comment successfully")
    );
});

export {
  addcommentOnTweet,
  getAllCommentsOnTweet,
  addReplyOnComments,
  deleteComment,
};
