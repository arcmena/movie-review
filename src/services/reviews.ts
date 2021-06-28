import Review from 'types/Review'

export async function fetchReviews(): Promise<Review[] | []> {
    return fetch('/api/reviews')
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.error(err.message))
}

export async function postReview(review: Review): Promise<Review[] | []> {
    return fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    })
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.error(err))
}

export async function patchReview(review: Review): Promise<Review[] | []> {
    return fetch(`/api/reviews/${review.id}`, {
        method: 'PATCH',
        body: JSON.stringify(review)
    })
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.error(err))
}

export async function deleteReview(id: string): Promise<Review[] | []> {
    return fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.error(err))
}
