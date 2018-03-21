import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {Button, Modal} from'semantic-ui-react';

/* Styles */
import 'semantic-ui-css/semantic.min.css';

/* Components */
import NavBar from './components/header';

/* Pages */
import Home from './pages/home';
import CampaignsPage from './pages/campaigns';
import CharitiesPage from './pages/charities';

export default class App extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <React.Fragment>
                    <NavBar/>
                    <React.Fragment>
                        <Route exact path="/" render={() => <Home />} />
                        <Route path="/campaigns" render={() => <CampaignsPage />} />
                        <Route path="/charities" render={() => <CharitiesPage />} />
                    </React.Fragment>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
