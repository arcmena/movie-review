import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from 'components/common/Layout'
import HomeView from 'components/home/HomeView'
import NewReviewView from 'components/review/NewReviewView'
import EditReviewView from 'components/review/EditReviewView'

import { useAppDispatch } from 'app/hooks'
import { loadReviews } from 'components/review/reviewReducer'

import { APP_URLS } from 'utils/constants'

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
                    <Route
                        path={`${APP_URLS.EDIT_REVIEW}/:id`}
                        component={EditReviewView}
                    />
                </Switch>
            </Layout>
        </Router>
    )
}
