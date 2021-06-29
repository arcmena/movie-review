import { waitForElementToBeRemoved, render, exampleReview } from 'test-utils'

import HomeView from 'components/home/HomeView'
import App from 'App'

import { makeServer } from 'server'

const REVIEWS_NOT_FOUND = 'No reviews found :( Add one!'

let server: any

beforeEach(() => {
    server = makeServer()
})

afterEach(() => {
    server.shutdown()
})

function HomeSetup() {
    return (
        // @ts-ignore
        <App>
            <HomeView />
        </App>
    )
}

test('renders without crashing', async () => {
    const { getByTestId } = render(<HomeSetup />)

    expect(getByTestId('spinner')).toBeInTheDocument()
})

test('render and show empty message', async () => {
    const { getByText, getByTestId } = render(<HomeSetup />)

    await waitForElementToBeRemoved(getByTestId('spinner'))

    expect(getByText(REVIEWS_NOT_FOUND)).toBeInTheDocument()
})

test('render a mocked review', async () => {
    server.create('review', exampleReview)

    const { getByText } = render(<HomeSetup />)

    await waitForElementToBeRemoved(getByText(REVIEWS_NOT_FOUND))

    expect(getByText(exampleReview.title)).toBeInTheDocument()
    expect(getByText(exampleReview.genres)).toBeInTheDocument()
    expect(getByText(exampleReview.opinion)).toBeInTheDocument()
})
