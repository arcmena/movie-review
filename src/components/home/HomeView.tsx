import { useAppSelector } from 'app/hooks'

import Review from 'components/review/Review'
import Spinner from 'components/ui/Spinner'

import { selectReviews } from 'components/review/reviewReducer'

import s from './HomeView.module.css'

export default function HomeView() {
    const reviews = useAppSelector(selectReviews)

    return (
        <div className={s.reviews}>
            {reviews ? (
                reviews.length !== 0 ? (
                    reviews.map(review => (
                        <Review data={review} key={review.id} />
                    ))
                ) : (
                    <p>No reviews found :( Add one!</p>
                )
            ) : (
                <Spinner />
            )}
        </div>
    )
}
