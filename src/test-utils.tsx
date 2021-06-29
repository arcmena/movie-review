import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ReactNode, FC } from 'react'
import { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from 'redux/store'

import Review from 'types/Review'

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

const renderWithRouterStore = (ui: ReactElement, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    const providerStore: FC<IProvider> = ({ children }) => (
        <BrowserRouter>
            <Provider store={store}>{children}</Provider>
        </BrowserRouter>
    )

    return render(ui, { wrapper: providerStore })
}

const exampleReview: Review = {
    id: 'foo_bar',
    title: 'Blade Runner 2049 (2017)',
    genres: 'Sci-fi, Thriller',
    opinion:
        "Deliberate in its pacing and world-building, the follow-up to Ridley Scott's dystopian vision of Los Angeles usesbreathtaking cinematography, impeccable production, and agripping story to make our second visit even more revelatory than the first."
}

export * from '@testing-library/react'

export { customRender as render, renderWithRouterStore, exampleReview }
