import { ButtonHTMLAttributes } from 'react'

import s from './Button.module.css'

export default function Button({
    children,
    ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={s.default_button} {...rest}>
            {children}
        </button>
    )
}
