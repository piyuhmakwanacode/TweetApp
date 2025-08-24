import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      requierd: true,
    },
    commentOn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
    Likes: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", CommentSchema);
