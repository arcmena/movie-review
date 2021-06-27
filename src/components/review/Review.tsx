import { CgTrash } from 'react-icons/cg'

import { useAppDispatch } from 'app/hooks'
import { removeReview } from './reviewReducer'

import ReviewType from 'types/Review'

import s from './Review.module.css'

interface IReview {
    data: ReviewType
}

export default function Review({
    data: { id, title, genres, opinion }
}: IReview) {
    const dispatch = useAppDispatch()

    const handleDelete = () => {
        dispatch(removeReview(id))
    }

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div>
                    <h1>{title}</h1>
                    <h2>{genres}</h2>
                </div>
                <CgTrash size={27} onClick={handleDelete} />
            </div>

            <div className={s.review__opnion}>
                <p>{opinion}</p>
            </div>
        </div>
    )
}
