import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/userSlice"
import categoryReducer from "./features/categorySlice"
import postReducer from "./features/postSlice"
import followReducer from "./features/followSlice"
export const store = configureStore({
  reducer: {
    users: userReducer,
    categories: categoryReducer,
    posts: postReducer,
    follow: followReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch