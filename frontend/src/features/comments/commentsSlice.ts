/* eslint-disable @typescript-eslint/no-explicit-any */
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import type {ValidationError} from "../../types";
import {createComment, fetchAllComments, fetchCommentById} from "./commentsThunks.ts";

interface CommentsState {
    items: any[];
    item: any;
    fetchLoading: boolean;
    fetchError: ValidationError | null;
}

const initialState: CommentsState = {
    items: [],
    item: null,
    fetchLoading: false,
    fetchError: null,
}

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllComments.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllComments.fulfilled, (state, {payload: comments}) => {
                state.items = comments;
                state.fetchLoading = false;
            })
            .addCase(fetchAllComments.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(fetchCommentById.pending,(state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchCommentById.fulfilled,(state, {payload: comments}) => {
                state.items = comments;
                state.fetchLoading = false;
            })
            .addCase(fetchCommentById.rejected,(state) => {
                state.fetchLoading = false;
            })
            .addCase(createComment.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.fetchLoading = false;
            })
            .addCase(createComment.rejected, (state, {payload: error}) => {
                state.fetchLoading = false;
                state.fetchError = error || null;
            })
    }
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.items;
export const selectOneComment = (state: RootState) => state.comments.item;
export const selectCommentsLoading = (state: RootState) => state.comments.fetchLoading;