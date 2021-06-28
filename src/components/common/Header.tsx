import { useLocation, useHistory } from 'react-router-dom'
import { CgArrowLeft, CgMathPlus } from 'react-icons/cg'

import Button from 'components/ui/Button'

import { APP_URLS } from 'utils/constants'

import s from './Header.module.css'

export default function Header() {
    const { pathname } = useLocation()
    const { push } = useHistory()

    const isHome: boolean = pathname === APP_URLS.HOME

    const handleNavigation = (): void =>
        !isHome ? push(APP_URLS.HOME) : push(APP_URLS.ADD_NEW_REVIEW)

    return (
        <header className={s.wrapper}>
            <h1>movie review</h1>{' '}
            <Button onClick={handleNavigation}>
                {!isHome ? (
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
            </Button>
        </header>
    )
}
