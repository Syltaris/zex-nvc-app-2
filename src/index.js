import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import NavBar from './components/header';

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
