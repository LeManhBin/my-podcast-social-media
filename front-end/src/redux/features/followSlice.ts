import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetFollower, fetchGetFollowing, fetchToggleFollow } from "../../api/followApi";
import { actGetAllPost } from "./postSlice";

export interface FollowType {
    followers: [],
    following: [],
    myFollowing: [],
    isLoading: Boolean,
}

const initialState: FollowType = {
    followers: [],
    following: [],
    myFollowing: [],
    isLoading: false,  
}

export const actGetFollower = createAsyncThunk("follow/actGetFollower", async (userId:number) => {
    const data = await fetchGetFollower(userId)
    return data
})

export const actGetFollowing = createAsyncThunk("follow/actGetFollowing", async (userId:number) => {
    const data = await fetchGetFollowing(userId)
    return data
})
export const actGetMyFollowing = createAsyncThunk("follow/actGetMyFollowing", async (userId:number) => {
    const data = await fetchGetFollowing(userId)
    return data
})

export const followSlice = createSlice({
    name: 'follow',
    initialState,
    reducers: {
          actUpdateIsLoading: (state, action) => {
            state.isLoading = action.payload
          },
    },
    extraReducers(builder) {
        // Danh sachs ng follow mình
        builder.addCase(actGetFollower.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(actGetFollower.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(actGetFollower.fulfilled, (state, action) => {
            state.isLoading = false
            state.followers = action?.payload?.data.data
        })

        // Danh sach nguoi mình follow`
        builder.addCase(actGetFollowing.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(actGetFollowing.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(actGetFollowing.fulfilled, (state, action) => {
            state.isLoading = false
            state.following = action?.payload?.data.data
        })
        // Người minhd follow
        builder.addCase(actGetMyFollowing.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(actGetMyFollowing.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(actGetMyFollowing.fulfilled, (state, action) => {
            state.isLoading = false
            state.myFollowing = action?.payload?.data.data
        })
    }
})

export const actToggleFollow = (payload: {userId: number, followerId: number}) => async(dispatch:any) => {
    try {
        dispatch(actUpdateIsLoading(true)) 
        fetchToggleFollow(payload).then((res:any) => {
           if(res.status == 200) {
            dispatch(actGetMyFollowing(payload?.userId))
            dispatch(actUpdateIsLoading(false))
            dispatch(actGetAllPost())
           }
        })
    } catch (error) {
        dispatch(actUpdateIsLoading(false))
        console.log(error);
    }finally {
        dispatch(actUpdateIsLoading(false))
    }
}
export const {actUpdateIsLoading} = followSlice.actions
export default followSlice.reducer
