import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from 'app/store'
import { fetchReviews, postReview, deleteReview } from 'services/reviews'

import Review from 'types/Review'

export interface ReviewState {
    reviews: Review[] | undefined
}

const initialState: ReviewState = {
    reviews: undefined
}

export const loadReviews = createAsyncThunk(
    'indexReviews/getStatus',
    async () => {
        const response = await fetchReviews()
        return response
    }
)

export const addReview = createAsyncThunk(
    'postReviews/getStatus',
    async (review: Review) => {
        const response = await postReview(review)
        return response
    }
)

export const removeReview = createAsyncThunk(
    'deleteReviews/getStatus',
    async (id: string) => {
        const response = await deleteReview(id)
        return response
    }
)

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadReviews.fulfilled, (state, action) => {
                state.reviews = action.payload
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.reviews = action.payload
            })
            .addCase(removeReview.fulfilled, (state, action) => {
                state.reviews = action.payload
            })
    }
})

export const selectReviews = (state: RootState) => state.review.reviews

export default reviewSlice.reducer
