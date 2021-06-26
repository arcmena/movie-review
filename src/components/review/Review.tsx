import { CgTrash } from 'react-icons/cg'

import ReviewType from 'types/Review'

import s from './Review.module.css'

interface IReview {
    data: ReviewType
}

export default function Review({ data: { title, genres, opinion } }: IReview) {
    return (
        <div>
            <div className={s.header}>
                <div>
                    <h1>{title}</h1>
                    <h2>
                        {genres.map((genre, index) => (
                            <span key={`${genre}-${index}`}>
                                {index !== 0 ? ', ' : ''}
                                {genre}
                            </span>
                        ))}
                    </h2>
                </div>
                <CgTrash size={27} />
            </div>

            <div className={s.review__opnion}>
                <p>{opinion}</p>
            </div>
        </div>
    )
}
