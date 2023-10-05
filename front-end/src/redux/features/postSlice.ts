import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCreatePost, fetchGetAllPost, fetchGetPostByCategoryId, fetchGetPostByIdUser, fetchGetPostByIdUserPrivate, fetchGetPostFollowing } from "../../api/postApi";

export interface postType {
    posts: any,
    postsByUser: any,
    postsPrivate: any,
    postsByCategory: any,
    postsFollowing: any,
    post: {},
    isLoading: Boolean,
    isLoadingCreate: Boolean
}

const initialState: postType = {
    posts: [],
    postsByUser: [],
    postsPrivate: [],
    postsByCategory: [],
    postsFollowing: [],
    post: {},
    isLoading: false,
    isLoadingCreate: false    
}

export const actGetAllPost = createAsyncThunk("post/actGetAllPost", async () => {
    const posts = await fetchGetAllPost()
    return posts
})

export const actGetPostByUserId = createAsyncThunk("post/actGetPostByUserId", async (userId:number) => {
    const posts = await fetchGetPostByIdUser(userId)
    return posts
})
export const actGetPostPrivate = createAsyncThunk("post/actGetPostPrivate", async (userId:number) => {
    const posts = await fetchGetPostByIdUserPrivate(userId)
    return posts
})

export const actGetPostByCategory = createAsyncThunk("post/actGetPostByCategory", async (categoryId:number) =>{
    const posts = await fetchGetPostByCategoryId(categoryId)
    return posts
})

export const actGetPostFollowing = createAsyncThunk("post/actGetPostFollowing", async (userId:number) =>{
    const posts = await fetchGetPostFollowing(userId)
    return posts
})
export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        actUpdateLoadingCreate: (state, action) => {
            state.isLoadingCreate = action.payload;
          },
          actUpdateIsLoading: (state, action) => {
            state.isLoading = action.payload
          },
    },
    extraReducers(builder) {
        builder.addCase(actGetAllPost.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(actGetAllPost.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(actGetAllPost.fulfilled, (state, action) => {
            state.isLoading = false
            state.posts = action?.payload?.data.data
        })
        // by user Id
        builder.addCase(actGetPostByUserId.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(actGetPostByUserId.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(actGetPostByUserId.fulfilled, (state, action) => {
            state.isLoading = false
            state.postsByUser = action?.payload?.data.data
        })
        // post private
        builder.addCase(actGetPostPrivate.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(actGetPostPrivate.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(actGetPostPrivate.fulfilled, (state, action) => {
            state.isLoading = false
            state.postsPrivate = action?.payload?.data.data
        })
        // post by category
        builder.addCase(actGetPostByCategory.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(actGetPostByCategory.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(actGetPostByCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.postsByCategory = action?.payload?.data.data
            console.log(action?.payload);
            
        })
        // post by following
        builder.addCase(actGetPostFollowing.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(actGetPostFollowing.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(actGetPostFollowing.fulfilled, (state, action) => {
            state.isLoading = false
            state.postsFollowing = action?.payload?.data.data
        })
    }
})
export const actCreatePost = (payload:any) => async(dispatch:any) => {
    try {
        dispatch(actUpdateLoadingCreate(true))
        fetchCreatePost(payload).then(() => {
            dispatch(actGetAllPost())
        })
        
    } catch (error) {
        dispatch(actUpdateLoadingCreate(false))
    }finally {
        dispatch(actUpdateLoadingCreate(false))
    }
} 
export const {
    actUpdateLoadingCreate,
    actUpdateIsLoading,
  } = postSlice.actions;
export default postSlice.reducer
