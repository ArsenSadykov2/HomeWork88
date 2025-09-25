import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: null,
    },
    dateTime: {
        type: Date,
        default: Date.now,
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;