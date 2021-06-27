import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Server, Model } from 'miragejs'
import { v4 as uuid } from 'uuid'

import { store } from 'app/store'
import App from 'App'

import 'styles/global.css'

new Server({
    models: {
        review: Model
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
    },
    routes() {
        this.namespace = 'api'

        this.get('/reviews', schema => {
            return schema.db.reviews
        })
        this.post('/reviews', (schema, request) => {
            const attrs = JSON.parse(request.requestBody)
            schema.db.reviews.insert(attrs)
            return schema.db.reviews
        })
        this.delete('/reviews', (schema, request) => {
            const id = JSON.parse(request.requestBody)
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
