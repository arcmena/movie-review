import { ReactNode } from 'react'

import Header from './Header'

import s from './Layout.module.css'

interface ILayout {
    children: ReactNode
}

export default function Layout({ children }: ILayout) {
    return (
        <div className={s.wrapper}>
            <Header />
            <main className={s.content}>{children}</main>
        </div>
    )
}
