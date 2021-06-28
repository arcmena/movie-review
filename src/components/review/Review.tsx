import { useHistory } from 'react-router-dom'

import { CgTrash } from 'react-icons/cg'
import { BiPencil } from 'react-icons/bi'

import { useAppDispatch } from 'app/hooks'
import { removeReview } from './reviewReducer'

import ReviewType from 'types/Review'

import { APP_URLS } from 'utils/constants'

import s from './Review.module.css'

interface IReview {
    data: ReviewType
}

export default function Review({
    data: { id, title, genres, opinion }
}: IReview) {
    const dispatch = useAppDispatch()

    const { push } = useHistory()

    const handleEdit = () => push(`${APP_URLS.EDIT_REVIEW}/${id}`)

    const handleDelete = () => dispatch(removeReview(id))

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div>
                    <h1>{title}</h1>
                    <h2>{genres}</h2>
                </div>
                <div className={s.actions}>
                    <BiPencil size={27} onClick={handleEdit} />
                    <CgTrash size={27} onClick={handleDelete} />
                </div>
            </div>

            <div className={s.review__opnion}>
                <p>{opinion}</p>
            </div>
        </div>
    )
}
