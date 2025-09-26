import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import type {Post, ValidationError} from "../../types";
import {createPost, fetchAllPosts, fetchPostById} from "./postsThunks.ts";

interface PostsState {
    items: Post[];
    item: Post | null;
    fetchLoading: boolean;
    fetchError: ValidationError | null;
}

const initialState: PostsState = {
    items: [],
    item: null,
    fetchLoading: false,
    fetchError: null,
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllPosts.fulfilled, (state, {payload: posts}) => {
                state.items = posts;
                state.fetchLoading = false;
            })
            .addCase(fetchAllPosts.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(fetchPostById.pending,(state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchPostById.fulfilled,(state, {payload: post}) => {
                state.item = post;
                state.fetchLoading = false;
            })
            .addCase(fetchPostById.rejected,(state) => {
                state.fetchLoading = false;
            })
            .addCase(createPost.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.fetchLoading = false;
            })
            .addCase(createPost.rejected, (state, {payload: error}) => {
                state.fetchLoading = false;
                state.fetchError = error || null;
            })
    }
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectOnePost = (state: RootState) => state.posts.item;
export const selectPostsLoading = (state: RootState) => state.posts.fetchLoading;