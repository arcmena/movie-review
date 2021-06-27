import { useForm, SubmitHandler } from 'react-hook-form'

import Button from 'components/ui/Button'

import Review from 'types/Review'

import s from './NewReviewForm.module.css'

export default function NewReviewForm() {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Review>({ mode: 'onTouched' })

    const onSubmit: SubmitHandler<Review> = data => console.log(data)

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
                    <p className={s.error}>This field is required</p>
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
                    <p className={s.error}>This field is required</p>
                )}
            </div>
            <div>
                <label htmlFor="opinion">
                    Opnion
                    <textarea
                        rows={4}
                        placeholder="Your opinion"
                        {...register('opinion', { required: true })}
                    />
                </label>
                {errors.opinion && (
                    <p className={s.error}>This field is required</p>
                )}
            </div>

            <Button type="submit">Share</Button>
        </form>
    )
}
