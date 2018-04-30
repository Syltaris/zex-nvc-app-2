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
import ChatPage from './pages/chat';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goals : [
                {
                    goal: "Get house by 30",
                    logs: [
                        {
                            activityDesc: 'Met expert regarding financial report on savings plan.',
                            date: '03/03/2018'
                        },
                        {
                            activityDesc: 'Started to think about savings plan.',
                            date: '01/03/2018'
                        }
                    ]
                }
            ],
            chats: [
                {
                    isUser: true,
                    message: 'Hi, can I find out more about how to do a savings plan?'
                },
                {
                    isUser: false,
                    message:'Sure thing, what is it exactly do you want to find out more about?'
                },
                {
                    isUser: true,
                    message:'I am saving up to afford for a house in the future, how do I start?'
                },
                {
                    isUser: false,
                    message: 'We recommend you find this expert here.'
                },
                {
                    isActionable: true,
                    isUser: false,
                    message: "Meet Wei Ding?"
                },
                {
                    isUser: true,
                   message: 'Alright, thanks!'
                },
            ],
            infos: [
                {
                    userAware: false,
                    title: "Know the forms you need to settle when buying a house?",
                    imageUri: "https://source.unsplash.com/collection/226405/100x100",
                    desc: "Buying a house is hard enough, filling up the paperwork that comes with it is even worse. Find out all the paperwork you need to settle when doing so.",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in lorem condimentum justo placerat faucibus in non nisl. Phasellus dictum vestibulum lacus sed sodales. Curabitur id turpis consectetur, dapibus ante a, pulvinar magna. Aliquam erat volutpat. Vestibulum rutrum neque neque, vel posuere leo laoreet eu. Morbi sit amet sem arcu. Cras dictum ex id cursus commodo. Proin ante nisi, volutpat ac metus in, consequat venenatis neque. Donec suscipit placerat sagittis. Nam viverra dui eros, nec placerat libero suscipit id. Ut ultrices auctor justo eu ullamcorper. In ac fringilla enim.",
                },
                {
                    userAware: false,
                    title: "Health risks and the coverage you already have.",
                    imageUri: "https://source.unsplash.com/collection/539469/100x100",
                    desc: "Do you know what your insurance can really cover you for? Find out more about the details of managing all the insruance for your health.",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in lorem condimentum justo placerat faucibus in non nisl. Phasellus dictum vestibulum lacus sed sodales. Curabitur id turpis consectetur, dapibus ante a, pulvinar magna. Aliquam erat volutpat. Vestibulum rutrum neque neque, vel posuere leo laoreet eu. Morbi sit amet sem arcu. Cras dictum ex id cursus commodo. Proin ante nisi, volutpat ac metus in, consequat venenatis neque. Donec suscipit placerat sagittis. Nam viverra dui eros, nec placerat libero suscipit id. Ut ultrices auctor justo eu ullamcorper. In ac fringilla enim.",
                }
            ]
        }
    }
    

    render() {
        return(
            <BrowserRouter>
                <React.Fragment>
                    <NavBar/>
                    <React.Fragment>
                        <Route exact path="/" render={() => <Home goals={this.state.goals} infos={this.state.infos}/>} />
                        <Route path="/chat" render={() => <ChatPage goals={this.state.goals} chats={this.state.chats}/>} />
                    </React.Fragment>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
