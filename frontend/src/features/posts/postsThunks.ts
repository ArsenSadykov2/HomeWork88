import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";
import type {Post, PostMutation, ValidationError} from "../../types";
import type { RootState } from "../../app/store.ts";

export const createPost = createAsyncThunk<void, PostMutation, {rejectValue: ValidationError, state: RootState}>(
    'posts/addPost',
    async (postMutation, {rejectWithValue, getState}) => {
        try{
            const formData = new FormData();

            const keys = Object.keys(postMutation) as (keyof PostMutation)[];
            keys.forEach(key => {
                const value = postMutation[key] as (keyof PostMutation);
                if(value !== null) {
                    formData.append(key, value);
                }
            })
            const token = getState().users.user?.token;

            if (!token) {
                return rejectWithValue({
                    errors: {
                        authentication: {
                            message: 'User not authenticated',
                            name: 'AuthenticationError'
                        },
                        messages: 'User not authenticated',
                        name: 'AuthenticationError',
                        _message: 'User not authenticated'
                    }
                });
            }

            const headers = {
                'Authorization': token
            };

            await axiosApi.post('/posts', formData, { headers });
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
