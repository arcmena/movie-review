import App from 'App'
import { render } from 'test-utils'

test('renders without crashing', () => {
    const { getByText } = render(<App />)

    expect(getByText(/movie review/i)).toBeInTheDocument()
})
