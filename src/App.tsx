import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomeView from 'components/home/HomeView'
import NewReviewView from 'components/review/NewReviewView'

import Layout from 'components/common/Layout'

import { APP_URLS } from 'utils/constants'

export default function App() {
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
