import reviewReducer, {
    resetCurrentEdit,
    ReviewState,
    setCurrentEdit
} from 'components/review/reviewReducer'

import { exampleReview } from 'test-utils'

const emptyInitialState: ReviewState = {
    reviews: undefined,
    currentEdit: undefined
}

const partialInitialState: ReviewState = {
    reviews: undefined,
    currentEdit: exampleReview
}

test('handle initial state', () => {
    expect(reviewReducer(undefined, { type: 'unknown' })).toEqual(
        emptyInitialState
    )
})

test('handle setCurrentEdit', () => {
    const actual = reviewReducer(
        emptyInitialState,
        setCurrentEdit(exampleReview)
    )

    expect(actual.currentEdit).not.toBe(undefined)

    expect(actual.currentEdit?.id).toBe(exampleReview.id)
    expect(actual.currentEdit?.title).toBe(exampleReview.title)
    expect(actual.currentEdit?.genres).toBe(exampleReview.genres)
    expect(actual.currentEdit?.opinion).toBe(exampleReview.opinion)
})

test('handle resetCurrentEdit', () => {
    const actual = reviewReducer(partialInitialState, resetCurrentEdit())

    expect(actual.currentEdit).not.toBe(undefined)
    expect(actual.currentEdit).toBe(undefined)
})
