import App from 'App'
import {
    waitForElementToBeRemoved,
    render,
    exampleReview,
    fireEvent
} from 'test-utils'

import Review from 'types/Review'

import { makeServer } from 'server'

let server: any

const REVIEWS_NOT_FOUND = 'No reviews found :( Add one!'

beforeEach(() => {
    server = makeServer()
})

afterEach(() => {
    server.shutdown()
})

describe('<HomeView />', () => {
    test('renders without crashing', async () => {
        const { getByTestId, getByText } = render(<App />)

        expect(getByText(/movie review/i)).toBeInTheDocument()
        expect(getByTestId('spinner')).toBeInTheDocument()
    })

    test('render a mocked review', async () => {
        server.create('review', exampleReview)

        const { getByText, getByTestId } = render(<App />)

        await waitForElementToBeRemoved(getByTestId('spinner'))

        // Expect all data to be displayed
        expect(getByText(exampleReview.title)).toBeInTheDocument()
        expect(getByText(exampleReview.genres)).toBeInTheDocument()
        expect(getByText(exampleReview.opinion)).toBeInTheDocument()
    })

    test('remove a mocked review', async () => {
        const { getByText, getByTestId } = render(<App />)

        expect(getByText(exampleReview.title)).toBeInTheDocument()

        fireEvent.click(getByTestId('button-remove_review'))

        await waitForElementToBeRemoved(getByText(exampleReview.title))

        expect(getByText(REVIEWS_NOT_FOUND)).toBeInTheDocument()
    })
})

describe('<EditReviewView />', () => {
    test('edit a mocked review', async () => {
        const newMovieTitle = 'Noop Nolan'

        server.create('review', exampleReview)

        const { getByText, getByTestId, getByPlaceholderText } = render(<App />)

        await waitForElementToBeRemoved(getByText(REVIEWS_NOT_FOUND))

        fireEvent.click(getByTestId('button-edit_review'))

        expect(getByText('Edit your review :)')).toBeInTheDocument()

        const titleInput = getByPlaceholderText(
            'Movie title'
        ) as HTMLInputElement
        const genresInput = getByPlaceholderText(
            'Movie Genres'
        ) as HTMLInputElement
        const opinionInput = getByPlaceholderText(
            'Your opinion'
        ) as HTMLInputElement

        expect(titleInput.value).toBe(exampleReview.title)
        expect(genresInput.value).toBe(exampleReview.genres)
        expect(opinionInput.value).toBe(exampleReview.opinion)

        fireEvent.change(titleInput, { target: { value: newMovieTitle } })

        expect(titleInput.value).toBe(newMovieTitle)

        fireEvent.click(getByTestId('button-submit_review_form'))

        await waitForElementToBeRemoved(getByText('Edit your review :)'))

        expect(getByText(newMovieTitle)).toBeInTheDocument()
    })
})

describe('<NewReviewView />', () => {
    test('create new review', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<App />)

        fireEvent.click(getByText('Add review'))

        const titleInput = getByPlaceholderText(
            'Movie title'
        ) as HTMLInputElement
        const genresInput = getByPlaceholderText(
            'Movie Genres'
        ) as HTMLInputElement
        const opinionInput = getByPlaceholderText(
            'Your opinion'
        ) as HTMLInputElement

        const newExampleReview: Review = {
            id: 'foobar',
            title: 'Foo',
            genres: 'Bar',
            opinion: 'lorem'
        }

        fireEvent.change(titleInput, {
            target: { value: newExampleReview.title }
        })
        fireEvent.change(genresInput, {
            target: { value: newExampleReview.genres }
        })
        fireEvent.change(opinionInput, {
            target: { value: newExampleReview.opinion }
        })

        expect(titleInput.value).toBe(newExampleReview.title)
        expect(genresInput.value).toBe(newExampleReview.genres)
        expect(opinionInput.value).toBe(newExampleReview.opinion)

        fireEvent.click(getByTestId('button-submit_review_form'))

        await waitForElementToBeRemoved(getByText('Share your review :)'))

        expect(getByText(newExampleReview.title)).toBeInTheDocument()
        expect(getByText(newExampleReview.genres)).toBeInTheDocument()
        expect(getByText(newExampleReview.opinion)).toBeInTheDocument()
    })
})
