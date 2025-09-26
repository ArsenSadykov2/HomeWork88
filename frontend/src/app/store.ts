import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {usersReducer} from "../features/users/usersSlice.ts";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER} from 'redux-persist/es/constants'
import {postsReducer} from "../features/posts/postsSlice.ts";
import {commentsReducer} from "../features/comments/commentsSlice.ts";


const userPersistConfig = {
    key: 'music:users',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    posts: postsReducer,
    comments: commentsReducer,
    users: persistReducer(userPersistConfig, usersReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER]
            }
        })
    }
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;