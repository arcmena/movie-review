import { ReactNode } from 'react'

import Header from './Header'

import s from './Layout.module.css'

interface ILayout {
    children: ReactNode
}

export default function Layout({ children }: ILayout) {
    return (
        <main className={s.wrapper}>
            <Header />
            {children}
        </main>
    )
}
