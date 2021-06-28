import { Router, useLocation } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import Header from 'components/common/Header'

import { render, fireEvent } from 'test-utils'

import { APP_URLS } from 'utils/constants'

export const LocationDisplay = () => {
    const location = useLocation()

    return <div data-testid="location-display">{location.pathname}</div>
}

test('renders without crashing', () => {
    const history = createMemoryHistory()
    const actualRoute = APP_URLS.HOME

    history.push(actualRoute)

    const { getByText } = render(
        <Router history={history}>
            <Header />
            <LocationDisplay />
        </Router>
    )
    expect(getByText(actualRoute)).toBeInTheDocument()
    expect(getByText(/Add review/)).toBeInTheDocument()
})

test(`navigate to ${APP_URLS.ADD_NEW_REVIEW}`, () => {
    const history = createMemoryHistory()
    const actualRoute = APP_URLS.HOME

    history.push(actualRoute)

    const { getByText } = render(
        <Router history={history}>
            <Header />
        </Router>
    )

    fireEvent.click(getByText(/Add review/))
    expect(getByText(/Return/)).toBeInTheDocument()
})
