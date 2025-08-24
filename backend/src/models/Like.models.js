import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema(
  {
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    likeBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", LikeSchema);
