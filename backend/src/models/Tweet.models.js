import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
    },
    tweetFile: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Likes: {
      type: Number,
      default: 0,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Tweet = mongoose.model("Tweet", TweetSchema);
