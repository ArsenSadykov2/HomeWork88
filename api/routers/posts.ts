import express from "express";
import {imagesUpload} from "../multer";
import {Error, Types} from "mongoose";
import Post from "../models/Post";
import auth, {RequestWithUser} from "../middleware/auth";

const postRouter = express.Router();

interface PostMutation {
    author: Types.ObjectId,
    title: string;
    content: string;
    image?: string;
}

postRouter.get('/', async (req, res, next) => {
    try{
        const posts = await Post.find({}, '-content')
            .populate({
                path: 'author',
                select: '-password -token -_id'
            })
            .sort({ dateTime: 1 })
            .exec();
        res.send(posts);
    } catch (e) {
        next(e);
    }
});

postRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try{
        const posts = await Post.findById(id)
            .populate({
                path: 'author',
                select: '-password -token -_id'
            })
            .exec();
        res.send(posts);
    } catch (e) {
        next(e);
    }
});

postRouter.post("/", imagesUpload.single('image'),auth, async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        const newPost: PostMutation = {
            author: user._id as Types.ObjectId,
            title: req.body.title,
            content: req.body.content,
        };
        if(req.file) newPost.image = 'images/' + req.file.filename;

        const post = new Post(newPost);
        await post.save();
        await post.populate({
            path: 'author',
            select: '-password -token -_id'
        });
        res.send(post);
    } catch (e) {
        if(e instanceof Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

export default postRouter;