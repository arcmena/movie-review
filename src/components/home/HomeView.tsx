import Review from 'components/review/Review'

import s from './HomeView.module.css'

const reviews = [
    {
        id: 1,
        title: 'Blade Runner 2049 (2017)',
        genres: 'Sci-fi, Thriller',
        opinion:
            "Deliberate in its pacing and world-building, the follow-up to Ridley Scott's dystopian vision of Los Angeles usesbreathtaking cinematography, impeccable production, and agripping story to make our second visit even more revelatory than the first."
    }
]

export default function HomeView() {
    return (
        <div className={s.reviews}>
            {reviews.map(review => (
                <Review data={review} key={review.id} />
            ))}
        </div>
    )
}
