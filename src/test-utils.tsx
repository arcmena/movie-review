import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ReactNode, FC } from 'react'
import { ReactElement } from 'react'
import { Provider } from 'react-redux'

import { store } from 'redux/store'

interface IProvider {
    chidlren?: ReactNode
}

const withProviders: FC<IProvider> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
)

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: withProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
