import { Router, useLocation } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import Layout from 'components/common/Layout'

import { render } from 'test-utils'

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
            <Layout>
                <LocationDisplay />
            </Layout>
        </Router>
    )

    expect(getByText(actualRoute)).toBeInTheDocument()
    expect(getByText('movie review')).toBeInTheDocument()
})
