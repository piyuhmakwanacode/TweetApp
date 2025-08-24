import mongoose from 'mongoose';

const replyOnCommentSchema = new mongoose.Schema({
    content: {
      type: String,
      requierd: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    replyOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
}, { timestamps:true });

export const replyOnComment = mongoose.model('replyOnComment', replyOnCommentSchema);
