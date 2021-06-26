import { useLocation, useHistory } from 'react-router-dom'
import { CgArrowLeft, CgMathPlus } from 'react-icons/cg'

import s from './Header.module.css'
import { APP_URLS } from 'utils/constants'

export default function Header() {
    const { pathname } = useLocation()
    const { push } = useHistory()

    const isAddReview: boolean = pathname === APP_URLS.ADD_NEW_REVIEW

    const handleNavigation = (): void =>
        isAddReview ? push(APP_URLS.HOME) : push(APP_URLS.ADD_NEW_REVIEW)

    return (
        <header className={s.wrapper}>
            <h1>movie review</h1>{' '}
            <button onClick={handleNavigation}>
                {isAddReview ? (
                    <>
                        Return
                        <CgArrowLeft size={22} />
                    </>
                ) : (
                    <>
                        Add review
                        <CgMathPlus size={22} />
                    </>
                )}
            </button>
        </header>
    )
}
