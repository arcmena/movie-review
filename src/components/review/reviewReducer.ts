import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk, RootState } from 'redux/store'
import {
    fetchReviews,
    postReview,
    patchReview,
    deleteReview
} from 'services/reviews'

import Review from 'types/Review'

export interface ReviewState {
    reviews: Review[] | undefined
    currentEdit: Review | undefined
}

const initialState: ReviewState = {
    reviews: undefined,
    currentEdit: undefined
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

export const updateReview = createAsyncThunk(
    'patchReview/getStatus',
    async (review: Review) => {
        const response = await patchReview(review)
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
    reducers: {
        setCurrentEdit: (state, action: PayloadAction<Review>) => {
            state.currentEdit = action.payload
        },
        resetCurrentEdit: state => {
            state.currentEdit = undefined
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadReviews.fulfilled, (state, action) => {
                state.reviews = action.payload
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.reviews = action.payload
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.reviews = action.payload
            })
            .addCase(removeReview.fulfilled, (state, action) => {
                state.reviews = action.payload
            })
    }
})

export const { setCurrentEdit, resetCurrentEdit } = reviewSlice.actions

export const selectReviews = (state: RootState) => state.review.reviews

export const selectCurrentEdit = (state: RootState) => state.review.currentEdit

export const getReviewInfo =
    (searchId: string): AppThunk =>
    (dispatch, getState) => {
        const currentValue = selectReviews(getState())
        const result = currentValue?.find(({ id }) => id === searchId)
        if (!result) throw new Error('No review was found')
        dispatch(setCurrentEdit(result))
    }

export default reviewSlice.reducer
