import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ReactNode, FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'

import { store } from 'redux/store'
import reviewReducer from 'components/review/reviewReducer'

import Review from 'types/Review'

interface IProvider {
    children?: ReactNode
}

const withProviders: FC<IProvider> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
)

// Custom renders

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

const renderWithReducer = (
    ui: ReactElement,
    {
        // @ts-ignore
        preloadedState,
        store = configureStore({
            reducer: { user: reviewReducer },
            preloadedState
        }),
        ...renderOptions
    } = {}
) => {
    function Wrapper({ children }: IProvider) {
        return <Provider store={store}>{children}</Provider>
    }
    return render(ui, { wrapper: Wrapper, ...renderOptions })
}

const exampleReview: Review = {
    id: 'foo_bar',
    title: 'John Doe and the Goonies',
    genres: 'Thriller',
    opinion:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, consequatur! Ullam atque enim veniam accusamus velit repellat animi nisi assumenda.'
}

export * from '@testing-library/react'

export {
    customRender as render,
    renderWithRouterStore,
    renderWithReducer,
    exampleReview
}
