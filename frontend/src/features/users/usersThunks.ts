import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {GlobalError, LoginMutation, RegisterMutation, User, ValidationError} from "../../types";
import {isAxiosError} from "axios";
import type {RootState} from "../../app/store.ts";
import {logoutUser} from "./usersSlice.ts";

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>(
    'users/register',
    async (registerMutation, {rejectWithValue}) => {
        try{
            const {data: user} = await axiosApi.post<User>('/users', registerMutation);
            return user;
        } catch (e) {
            if(isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }

            throw e;
        }
    }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try{
            const {data: user} = await axiosApi.post<User>('/users/sessions', loginMutation);
            return user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }

            throw e;
        }
    }
);

export const logout = createAsyncThunk<void, undefined, {state: RootState}>(
    'users/logout',
    async (_, {getState, dispatch}) => {
        const token = getState().users.user?.token;
        axiosApi.delete('/users/sessions/', {headers: {'Authorization': token}});
        dispatch(logoutUser());
    }
);