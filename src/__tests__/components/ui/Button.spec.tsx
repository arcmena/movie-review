import { render, fireEvent } from '@testing-library/react'
import { useState } from 'react'

import Button from 'components/ui/Button'

test('renders without crashing', () => {
    const { getByText } = render(<Button>Share!</Button>)

    expect(getByText(/Share!/i)).toBeInTheDocument()
})

const TestProps = () => {
    const [count, setCounter] = useState(0)

    return (
        <Button onClick={() => setCounter(count => count + 1)} type="button">
            Click to increase: {count}
        </Button>
    )
}

it('function properly passing props', () => {
    const { getByText, queryByText } = render(<TestProps />)

    expect(queryByText(/Click to increase: 0/)).toBeDefined()

    fireEvent.click(getByText(/Click to increase/))

    expect(queryByText(/Click to increase: 1/)).toBeDefined()
})
