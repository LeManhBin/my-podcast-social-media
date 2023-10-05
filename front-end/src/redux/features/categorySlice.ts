import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { category } from "../../constants/types";
import { fetchGetAllCategory, fetchGetCategoryId } from "../../api/categoryApi";

export interface categoryType {
    categories: category[],
    category: {},
    isLoading: Boolean,
}

const initialState: categoryType = {
    categories: [],
    category: {},
    isLoading: false    
}

export const actGetAllCategory = createAsyncThunk("category/actGetAllCategory", async () => {
    const categories = await fetchGetAllCategory()
    return categories
})

export const actGetCategoryById = createAsyncThunk("category/actGetCategoryById", async (id:number) => {
    const category = await fetchGetCategoryId(id)
    return category
})

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(actGetAllCategory.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(actGetAllCategory.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(actGetAllCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.categories = action?.payload?.data.data
        })
    }
})

export default categorySlice.reducer
