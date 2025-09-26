import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try{
        await db.dropCollection('users');
        await db.dropCollection('posts');
        await db.dropCollection('comments');
    } catch (e){
        console.log('Connections were not present');
    }

    const firstUser = new User({
        username: 'User1',
        password: '123',
    });
    firstUser.generateToken();
    await firstUser.save();

    const secondUser = new User({
        username: 'User2',
        password: '123',
    });
    secondUser.generateToken();
    await secondUser.save();

    const firstPost = await Post.create({
        author: firstUser._id,
        title: 'Post 1',
        image: 'images/Image.png'
    });

    const secondPost = await Post.create({
        author: secondUser._id,
        title: 'Post 2',
        content: "Post 2 content",
        image: 'images/Image.png'
    });
    await Comment.create({
        author: firstUser._id,
        post: firstPost._id,
        comment: 'First comment'
    });

    await Comment.create({
        author: secondUser._id,
        post: firstPost._id,
        comment: 'Second comment'
    });

    await Comment.create({
        author: firstUser._id,
        post: secondPost._id,
        comment: 'Third comment'
    });

    await Comment.create({
        author: secondUser._id,
        post: secondPost._id,
        comment: 'Fourth comment'
    });

    await db.close();
};

run().catch(console.error);