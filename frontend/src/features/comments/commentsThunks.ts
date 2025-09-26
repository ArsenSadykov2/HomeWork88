import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";
import type {CommentMutation, ValidationError} from "../../types";
import type { RootState } from "../../app/store.ts";



export const createComment = createAsyncThunk<void, CommentMutation, {rejectValue: ValidationError, state: RootState}>(
    'comments/createComment',
    async (commentMutation, {rejectWithValue, getState}) => {
        try{
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

            await axiosApi.post('/comments', commentMutation, { headers });

        } catch (e) {
            if(isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

export const fetchAllComments = createAsyncThunk<Comment[], void>(
    'comments/fetchAllComments',
    async () => {
        const response = await axiosApi.get<Comment[]>('/comments');
        return response.data;
    }
);

export const fetchCommentById = createAsyncThunk<Comment[], string>(
    'comments/fetchCommentById',
    async (commentId) => {
        const response = await axiosApi.get<Comment[]>(`/comments?post=${commentId}`);
        return response.data;
    }
);
