import mongoose, {Error} from "mongoose";
import Post from "./Post";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
});

CommentSchema.pre('save', async function (next) {
    const comment = this;

    const postExist = await Post.findById(comment.post);

    if(!postExist){
        const error = new Error("Post not found");
        next(error);
    }
    next();
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;