import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomeView from 'components/home/HomeView'
import NewReviewView from 'components/review/NewReviewView'

import Layout from 'components/common/Layout'

import { APP_URLS } from 'utils/constants'

import { useAppDispatch } from 'app/hooks'
import { useEffect } from 'react'
import { loadReviews } from 'components/review/reviewReducer'

export default function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadReviews())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path={APP_URLS.HOME} exact component={HomeView} />
                    <Route
                        path={APP_URLS.ADD_NEW_REVIEW}
                        component={NewReviewView}
                    />
                </Switch>
            </Layout>
        </Router>
    )
}
