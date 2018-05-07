import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

/* Helpers */
import { strapiCall } from '../src/helpers/helpers';

/* Styles */
import 'semantic-ui-css/semantic.min.css';

/* Components */
import NavBar from './components/header';

/* Pages */
import Login from './pages/login';
import Home from './pages/home';
import ChatPage from './pages/chat';
import GoalsPage from './pages/goals';
import ProfilePage from './pages/profile';
import DownloadPage from './pages/guide_download';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            goals : [],
            chats: [],
            infos: [],
            loggedIn: false
        }

        this.updateUser = this.updateUser.bind(this);
        this.updateGoals = this.updateGoals.bind(this);
    }

    componentWillMount() {
        strapiCall('chats', null, 'GET', (respData) => this.setState({chats: respData}));
        strapiCall('goals', null, 'GET', (respData) => this.setState({goals: respData}));
        strapiCall('infos', null, 'GET', (respData) => this.setState({infos: respData}));
    }
    
    updateUser(user) {
        this.setState({user: user})
    }

    updateGoals(goals) {
        this.setState({goals: goals})
    }

    render() {
        return(
            <BrowserRouter>
                <React.Fragment>
                    <NavBar user={this.state.user}/>
                    <React.Fragment >
                        <Route exact path="/" render={() => {
                            if(this.state.user) {
                                return <Home user={ this.state.user} updateGoals={this.updateGoals} goals={this.state.goals} infos={this.state.infos}/>;
                            } else {
                                return <Login updateUser={this.updateUser} user={this.state.user}/>;
                            }
                        }}/>
                        <Route path="/chat" render={() => {
                            if(this.state.user) {
                                return <ChatPage user={ this.state.user} updateGoals={this.updateGoals} goals={this.state.goals} chats={this.state.chats}/>
                            } else {
                                return <Login updateUser={this.updateUser} user={this.state.user}/>;
                            }
                        }}/>
                        <Route path="/goals" render={() => {
                            if(this.state.user) {
                                return <GoalsPage user={ this.state.user} updateGoals={this.updateGoals} goals={this.state.goals} chats={this.state.chats}/>
                            } else {
                                return <Login updateUser={this.updateUser} user={this.state.user}/>;
                            }
                        }}/>
                        <Route path="/profile" render={() => {
                            if(this.state.user) {
                                return <ProfilePage user={ this.state.user} updateGoals={this.updateGoals} goals={this.state.goals} chats={this.state.chats}/>
                            } else {
                                return <Login updateUser={this.updateUser} user={this.state.user}/>;
                            }
                        }}/>
                        <Route path="/download" render={() => {
                            if(this.state.user) {
                                return <DownloadPage updateUser={this.updateUser} user={ this.state.user} />
                            } else {
                                return <Login updateUser={this.updateUser} user={this.state.user}/>;
                            }
                        }}/>
                    </React.Fragment>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
