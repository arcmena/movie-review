import NewReviewForm from './NewReviewForm'

import s from './NewReviewView.module.css'

export default function NewReviewView() {
    return (
        <>
            <h1 className={s.title}>Share your review :)</h1>
            <NewReviewForm />
        </>
    )
}
