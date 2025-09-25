import express from "express";
import User from "../models/User";
import {UserFields} from "../types";
import mongoose from "mongoose";

const usersRouter = express.Router();

usersRouter.get("/", async (_req, res, next) => {
    try {
        const users = await User.find({}, '-token');
        res.send(users);
    } catch (e) {
        next (e);
    }
})

usersRouter.post("/", async (req, res, next) => {
    const userData: Omit<UserFields, 'token'> = {
        username: req.body.username,
        password: req.body.password
    };


    try {
        const user = new User(userData);
        user.generateToken();

        await user.save();
        res.send(user);
    } catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

usersRouter.post("/sessions", async (req, res, next) => {
    try{
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            return res.status(404).send({error: "Username or Password is wrong"});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({error: "Username or Password is wrong"});
        }

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        next(e);
    }
});

usersRouter.delete("/sessions", async (req, res, next) => {
    try{
        const token = req.get('Authorization');
        if(!token) {
            return res.status(204).send();
        }
        const user = await User.findOne({token});
        if(!user) {
            return res.status(204).send();
        }
        user.generateToken();
        user.save();

        res.status(204).send();
    } catch (e) {
        next(e);
    }
})

export default usersRouter;