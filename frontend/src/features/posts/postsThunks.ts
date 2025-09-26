import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";
import type {Post, PostMutation, ValidationError} from "../../types";

export const addPost = createAsyncThunk<Post, PostMutation, {rejectValue: ValidationError}>(
    'posts/addPost',
    async (postMutation, {rejectWithValue}) => {
        try{
            const {data: user} = await axiosApi.post<Post>('/posts', postMutation);
            return user;
        } catch (e) {
            if(isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }

            throw e;
        }
    }
);

export const fetchAllPosts = createAsyncThunk<Post[], void>(
    'posts/fetchAllPosts',
    async () => {
        const response = await axiosApi.get<Post[]>('/posts');
        return response.data;
    }
);

export const fetchPostById = createAsyncThunk<Post[], string>(
    'posts/fetchPostById',
    async (postId) => {
        const response = await axiosApi.get<Post[]>('/posts/' + postId);
        return response.data || null;
    }
);
