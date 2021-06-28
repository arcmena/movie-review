import { render } from '@testing-library/react'

import Spinner from 'components/ui/Spinner'

test('renders without crashing', () => {
    const { getByTestId } = render(<Spinner />)

    expect(getByTestId(/Spinner/i)).toBeInTheDocument()
})
