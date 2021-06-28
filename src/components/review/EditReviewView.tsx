import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import ReviewForm from './ReviewForm'

import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
    getReviewInfo,
    resetCurrentEdit,
    selectCurrentEdit,
    updateReview
} from './reviewReducer'

import { APP_URLS } from 'utils/constants'

import Review from 'types/Review'

import s from './EditReviewView.module.css'

export default function EditReviewView() {
    const dispatch = useAppDispatch()

    const currentEdit = useAppSelector(selectCurrentEdit)

    const { push } = useHistory()

    const { id } = useParams() as {
        id: string | undefined
    }

    const onSubmit: SubmitHandler<Review> = data =>
        dispatch(updateReview(data)).then(() => push(APP_URLS.HOME))

    useEffect(() => {
        if (id) dispatch(getReviewInfo(id))

        return () => {
            dispatch(resetCurrentEdit())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h1 className={s.title}>Edit your review :)</h1>
            {currentEdit && (
                <ReviewForm
                    defaultValues={currentEdit}
                    onSubmit={onSubmit}
                    buttonTitle="Save"
                />
            )}
        </>
    )
}
