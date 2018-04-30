import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

/* Styles */
import 'semantic-ui-css/semantic.min.css';

/* Components */
import NavBar from './components/header';

/* Pages */
import Login from './pages/login';
import Home from './pages/home';
import ChatPage from './pages/chat';

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
    }

    componentWillMount() {
        Promise.resolve(localStorage.getItem('accessToken'))
        .then(jwt =>
            fetch("http://52.77.251.137:1337/chats", {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': `Bearer `+ jwt
                }
            })
            .then(resp => resp.json())
            .then(respData => this.setState({chats: respData}))
            .catch(err => this.setState({chats: [
              {msg: 'error'},
            ]}))
        )

        Promise.resolve(localStorage.getItem('accessToken'))
        .then(jwt =>
            fetch("http://52.77.251.137:1337/goals", {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': `Bearer `+ jwt
                }
            })
            .then(resp => resp.json())
            .then(respData => this.setState({goals: respData}))
            .catch(err => this.setState({goals: [
              {msg: 'error'},
            ]}))
        )

        Promise.resolve(localStorage.getItem('accessToken'))
        .then(jwt =>
            fetch("http://52.77.251.137:1337/infos", {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': `Bearer `+ jwt
                }
            })
            .then(resp => resp.json())
            .then(respData => this.setState({infos: respData}))
            .catch(err => this.setState({infos: [
              {msg: 'error'},
            ]}))
        )
    }
    
    updateUser(user) {
        this.setState({user: user})
    }

    render() {
        return(
            <BrowserRouter>
                <React.Fragment>
                    <NavBar user={this.state.user}/>
                    <React.Fragment>
                        <Route exact path="/" render={() => {
                            if(this.state.user) {
                                return <Home user={ this.state.user} goals={this.state.goals} infos={this.state.infos}/>;
                            } else {
                                return <Login updateUser={this.updateUser} user={this.state.user}/>;
                            }
                        }}/>
                        <Route path="/chat" render={() => {
                            if(this.state.user) {
                                return <ChatPage user={ this.state.user} goals={this.state.goals} chats={this.state.chats}/>
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
