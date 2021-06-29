import Review from 'components/review/Review'

import { renderWithRouterStore, exampleReview } from 'test-utils'

test('renders without crashing and show data', () => {
    const { getByText } = renderWithRouterStore(<Review data={exampleReview} />)

    expect(getByText(exampleReview.title)).toBeInTheDocument()
    expect(getByText(exampleReview.genres)).toBeInTheDocument()
    expect(getByText(exampleReview.opinion)).toBeInTheDocument()
})
