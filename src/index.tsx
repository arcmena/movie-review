import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Server, Model } from 'miragejs'
import { v4 as uuid } from 'uuid'

import { store } from 'app/store'
import App from 'App'

import Review from 'types/Review'

import 'styles/global.css'

new Server({
    models: {
        review: Model.extend<Partial<Review>>({})
    },
    seeds(server) {
        server.create('review', {
            id: uuid(),
            title: 'Blade Runner 2049 (2017)',
            genres: 'Sci-fi, Thriller',
            opinion:
                "Deliberate in its pacing and world-building, the follow-up to Ridley Scott's dystopian vision of Los Angeles usesbreathtaking cinematography, impeccable production, and agripping story to make our second visit even more revelatory than the first."
        })
        server.create('review', {
            id: uuid(),
            title: 'WandaVision (2021)',
            genres: 'Action, Adventure',
            opinion:
                "She's not the first superhero to be affected acutely by emotional pain; everyone knows that quote about great power and great responsibility. Yet for an MCU project, the choice to focus on Wanda's inner life is revolutionary."
        })
        server.create('review', {
            id: uuid(),
            title: "Zack Snyder's Justice League (2021)",
            genres: 'Action, Adventure',
            opinion:
                "Visually stunning and thrillingly dark, the 'Snyder Cut' is an ambitious and admirable cinematic experience - the most impressive superhero film since Nolan's Dark Knight series. While its writing and attempts at humor don't always hit the mark, and the film is stronger in its first 3/4 than its weaker finale, 'Snyder Cut' is overall a satisfying watch that deserves the hype."
        })
    },
    routes() {
        this.namespace = 'api/reviews'

        this.get('/', schema => {
            return schema.db.reviews
        })
        this.post('/', (schema, request) => {
            const attrs: Review = JSON.parse(request.requestBody)
            schema.db.reviews.insert(attrs)
            return schema.db.reviews
        })
        this.patch('/:id', (schema, request) => {
            const id: string = String(request.params.id)
            const updatedReview: Review = JSON.parse(request.requestBody)
            schema.db.reviews.update(id, updatedReview)
            return schema.db.reviews
        })
        this.delete('/:id', (schema, request) => {
            const id: string = String(request.params.id)
            schema.db.reviews.remove(id)
            return schema.db.reviews
        })
    }
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
