import { useForm, SubmitHandler } from 'react-hook-form'

import Button from 'components/ui/Button'

import Review from 'types/Review'

import s from './ReviewForm.module.css'

interface IReviewForm {
    defaultValues: Review
    onSubmit: SubmitHandler<Review>
    buttonTitle: string
}

export default function ReviewForm({
    defaultValues,
    onSubmit,
    buttonTitle
}: IReviewForm) {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Review>({ mode: 'onTouched', defaultValues })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <div>
                <label htmlFor="title">
                    Title
                    <input
                        type="text"
                        placeholder="Movie title"
                        {...register('title', { required: true })}
                    />
                </label>
                {errors.title && (
                    <p className={s.error} data-testid="error_message">
                        This field is required
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="genres">
                    Genres
                    <input
                        type="text"
                        placeholder="Movie Genres"
                        {...register('genres', { required: true })}
                    />
                </label>
                {errors.genres && (
                    <p className={s.error} data-testid="error_message">
                        This field is required
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="opinion">
                    Opinion
                    <textarea
                        rows={4}
                        placeholder="Your opinion"
                        {...register('opinion', { required: true })}
                    />
                </label>
                {errors.opinion && (
                    <p className={s.error} data-testid="error_message">
                        This field is required
                    </p>
                )}
            </div>

            <Button type="submit" data-testid="button-submit_review_form">
                {buttonTitle}
            </Button>
        </form>
    )
}
