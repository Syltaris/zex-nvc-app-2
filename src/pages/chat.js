import React from 'react';
import {
    Container,
    Button,
    Header,
    Grid,
    Card,
    Icon,
    Image,
    Input
} from 'semantic-ui-react';

/* Helpers */
import { logAction } from '../helpers/helpers';

import Goals from '../pages/goals';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            goals : props.goals,
            chats: [],
            fetchedChats: props.chats,
            fetchedDemoChats: props.chats.filter(x => x.isDemo),
            input_userChatInput: '',
            buttonPress: false,
            
            demoCarryOn: true,
            demoChatToPushIndex: 0,
            demoChats: [{
                isUser: false,
                message: "Hello! Sure thing what do you need exactly?",
                isActionable: false
            },
            {
                isUser: false,
                message: "Me? I'm a real person, really.",
                isActionable: false
            },
            {
                isUser: false,
                message: "I love being human.",
                isActionable: false
            }
                
            ]
        };

        this.populateChatContainer = this.populateChatContainer.bind(this);

        this.updateUserChatInput = this.updateUserChatInput.bind(this);
        this.submitUserChatInput = this.submitUserChatInput.bind(this);
    }

    componentWillMount() {
        logAction('visited_chatPage', this.state.user.name);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            fetchedChats: nextProps.chats,
            demoChats: nextProps.chats.filter(x => x.isDemo),
            goals: nextProps.goals,
            user: nextProps.user
        })
    }

    componentDidMount() {
        setInterval(
            () => {
                if(this.state.demoCarryOn && this.state.fetchedChats.filter(x => !x.isDemo).length > this.state.chats.length) {
                    var newArr = this.state.chats;
                    newArr.push(this.state.fetchedChats.filter(x => !x.isDemo)[this.state.chats.length]);
                    this.setState((prevState) => {
                        return {
                            chats: newArr
                        }
                    })
                } else {
                    clearInterval();
                }
            }
        , 2000)
    }

    updateUserChatInput(e) {this.setState({input_userChatInput: e.target.value, demoCarryOn: false})}
    submitUserChatInput(e) {
        if(e.key === "Enter") {
            this.setState( (prevState) => {
                var nextState = prevState;
                var messageToPush = nextState.input_userChatInput;
                var newChats = nextState.chats;
                newChats.push({
                    isUser: true,
                    message: messageToPush
                });

                //demo actions, REMOVE IN ACTUAL ONE?
                if(this.state.fetchedDemoChats.length > this.state.demoChatToPushIndex) {
                    setTimeout(
                        () => {
                            var newArr = this.state.chats;
                            newArr.push(this.state.fetchedDemoChats[this.state.demoChatToPushIndex]);
                            this.setState((prevState) => {
                                return {
                                    chats: newArr,
                                    demoChatToPushIndex: prevState.demoChatToPushIndex+1
                                }
                            });
                        }
                    , 2000+Math.floor(Math.random() * 1500)); //extra illusion
                }

                logAction('chat_inputEntered', this.state.user.name);

                return {
                    chats: newChats,
                    input_userChatInput: ''
                }
            })
        }
    }

    populateChatContainer() {
        return (
            <Container>

            </Container>
        )
    }

    render() {
        return (
            <Grid style={{backgroundColor:'#001f3f', height:'100%', minHeight: '94vh'}}>
                <Container style={{backgroundColor: 'white', paddingRight: 10, paddingBottom: 10, height: '100%'}}>
                    <Grid style={{marginBottom: 15}}>
                        <Grid.Row style={{paddingLeft: 30}}>
                            <Header>
                            You're currently connected with 'Chang Wei, Life Expert'. 
                            </Header>
                        </Grid.Row>
                        {
                            this.state.chats && this.state.chats.map(c => 
                                <Grid.Row 
                                textAlign={c.isUser ? "right" : "left"} 
                                style={{paddingLeft: 30, paddingRight:30}}> 
                                    <Container  textAlign={c.isUser ? "right" : "left"}>
                                        {  
                                            c.isActionable
                                            ?
                                            <Card>
                                                <Card.Content>
                                                    <Image floated='right' size='mini' src={c.pictureUri} />
                                                    <Card.Header>
                                                        {c.message}
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        Financial Expert
                                                    </Card.Meta>
                                                </Card.Content>
                                                <Card.Content extra>
                                                    {
                                                        this.state.buttonPress
                                                        ?
                                                        this.state.logAdded && this.state.logAdded ? <div>Added to your goals!</div> : <div>Noted!</div>
                                                        :
                                                        <div className='ui two buttons'>
                                                            <Button basic icon color="red" onClick={() => {
                                                                this.setState({buttonPress: true});
                                                                logAction('chat_buttonNo', this.state.user.name);
                                                            }}>
                                                                <Icon name="remove" />
                                                            </Button>
                                                            <Button basic icon color="green" onClick={() => {
                                                                this.setState({buttonPress: true, logAdded: true});

                                                                this.setState((prevState) => {
                                                                    var newState = prevState;
                                                                    newState.goals[0].logs.push({
                                                                        date: "2018-05-10T00:00:00",
                                                                        activityDesc: "Meeting Wei Ding to learn more about making financial plan."
                                                                    })
                                                                    return {
                                                                        goals: newState.goals
                                                                    }
                                                                })
                                                                logAction('chat_buttonYes', this.state.user.name);
                                                            }}>
                                                                <Icon name="checkmark" />
                                                            </Button>
                                                        </div>
                                                    }
                                                </Card.Content>
                                            </Card>
                                            :
                                            <Container fluid  >
                                                <Container style={{border: '1px solid black', padding: 5, borderRadius: 5}}>
                                                    {c.isUser ? null: <Image avatar spaced="right" src="https://source.unsplash.com/random/21x21" />}
                                                    {c.message}
                                                    {c.isUser ? <Image avatar spaced="left "src="https://source.unsplash.com/random/20x20" /> : null}
                                                </Container>
                                            </Container>
                                        }
                                    </Container>
                                </Grid.Row>
                            )
                        }
                    </Grid>
                    <Container style={{ marginBottom: 0}}>
                        <Input fluid style={{marginLeft: 10, alignItem: 'bottom'}} 
                        icon="angle left" 
                        onChange={this.updateUserChatInput} 
                        onKeyPress={this.submitUserChatInput}
                        value={this.state.input_userChatInput}/>
                    </Container>                
                </Container>
            </Grid>

        )
    }
}