import { SubmitHandler } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import ReviewForm from './ReviewForm'

import { useAppDispatch } from 'redux/hooks'
import { addReview } from './reviewReducer'

import { APP_URLS } from 'utils/constants'

import Review from 'types/Review'

import s from './NewReviewView.module.css'

const defaultValues: Review = {
    id: uuid(),
    title: '',
    genres: '',
    opinion: ''
}

export default function NewReviewView() {
    const dispatch = useAppDispatch()

    const { push } = useHistory()

    const onSubmit: SubmitHandler<Review> = data =>
        dispatch(addReview(data)).then(() => push(APP_URLS.HOME))

    return (
        <>
            <h1 className={s.title}>Share your review :)</h1>
            <ReviewForm
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                buttonTitle="Share"
            />
        </>
    )
}
