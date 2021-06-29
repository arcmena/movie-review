import ReviewForm from 'components/review/ReviewForm'
import { act } from 'react-dom/test-utils'

import { exampleReview, render, fireEvent } from 'test-utils'

import Review from 'types/Review'

const emptyInitialValues: Review = {
    id: '',
    title: '',
    genres: '',
    opinion: ''
}

const mockOnSubmit = jest.fn()

test('renders without crashing', () => {
    const { getByPlaceholderText } = render(
        <ReviewForm
            buttonTitle="Foo"
            onSubmit={mockOnSubmit}
            defaultValues={emptyInitialValues}
        />
    )

    expect(getByPlaceholderText('Movie title')).toBeInTheDocument()
})

test('renders with set defaultValues', () => {
    const { getByPlaceholderText } = render(
        <ReviewForm
            buttonTitle="Foo"
            onSubmit={mockOnSubmit}
            defaultValues={exampleReview}
        />
    )

    const titleInput = getByPlaceholderText('Movie title') as HTMLInputElement
    const genresInput = getByPlaceholderText('Movie Genres') as HTMLInputElement
    const opinionInput = getByPlaceholderText(
        'Your opinion'
    ) as HTMLInputElement

    expect(titleInput.value).toBe(exampleReview.title)
    expect(genresInput.value).toBe(exampleReview.genres)
    expect(opinionInput.value).toBe(exampleReview.opinion)
})

test('should display required error when a value is invalid (empty)', async () => {
    const { getByTestId, findAllByTestId } = render(
        <ReviewForm
            buttonTitle="Foo"
            onSubmit={mockOnSubmit}
            defaultValues={emptyInitialValues}
        />
    )

    fireEvent.submit(getByTestId('button-submit_review_form'))
    expect(mockOnSubmit).not.toBeCalled()

    expect(await findAllByTestId('error_message')).toHaveLength(3)
})

test('should not display error when all values are valid', async () => {
    const { getByTestId, getByPlaceholderText, queryAllByTestId } = render(
        <ReviewForm
            buttonTitle="Foo"
            onSubmit={mockOnSubmit}
            defaultValues={emptyInitialValues}
        />
    )

    const titleInput = getByPlaceholderText('Movie title') as HTMLInputElement
    const genresInput = getByPlaceholderText('Movie Genres') as HTMLInputElement
    const opinionInput = getByPlaceholderText(
        'Your opinion'
    ) as HTMLInputElement

    fireEvent.change(titleInput, { target: { value: exampleReview.title } })
    fireEvent.change(genresInput, { target: { value: exampleReview.genres } })
    fireEvent.change(opinionInput, { target: { value: exampleReview.opinion } })

    await act(async () => {
        fireEvent.click(getByTestId('button-submit_review_form'))
    })

    expect(mockOnSubmit).toHaveBeenCalled()
    expect(queryAllByTestId('error_message')).toHaveLength(0)
})
