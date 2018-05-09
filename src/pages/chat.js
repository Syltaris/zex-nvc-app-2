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
            optionsButtonPress: [false, false, false],
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

        this.triggerNextDemoChat = this.triggerNextDemoChat.bind(this);

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

                this.triggerNextDemoChat();

                logAction('chat_inputEntered', this.state.user.name);

                return {
                    chats: newChats,
                    input_userChatInput: ''
                }
            })
        }
    }

    triggerNextDemoChat() {
        //demo actions, REMOVE IN ACTUAL ONE?
        if(this.state.fetchedDemoChats.length > this.state.demoChatToPushIndex) {
            setTimeout(
                () => {
                    //dangerous hack!
                    if(this.state.fetchedDemoChats[this.state.demoChatToPushIndex].isChainMessage) {
                        this.triggerNextDemoChat();
                    }
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
    }

    populateChatContainer(c) {
        if(c.isActionable) {
            return <Card>
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
        } else if (c.isInfolink) {
            return <Container fluid  >
                <Container style={{border: '1px solid black', padding: 5, borderRadius: 5}}>
                    {c.isUser ? null: <Image avatar spaced="right" src="https://source.unsplash.com/random/21x21" />}
                    {c.message}
                    {c.isUser ? <Image avatar spaced="left "src="https://source.unsplash.com/random/20x20" /> : null}
                </Container>
            </Container>
        } else if (c.isOptions) {
            return <Card.Group itemsPerRow={4}>
            <Card>
            <Card.Content>
                <Image floated='right' size='mini' 
                src='data:image/jpeg;base64,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' />
                <Card.Header>
                OCBC
                </Card.Header>
                <Card.Meta>
                <strong>97%</strong> Suitability
                </Card.Meta>
                <Card.Description>
                Bonus+Savings Account
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {   
                    !this.state.optionsButtonPress[0] 
                    ?
                        <div className='ui one buttons'>
                        <Button basic color='green' onClick={() => 
                            this.setState((prevState) => {
                                var newState = prevState;
                                newState.optionsButtonPress[0] = true;
                                return {
                                    optionsButtonPress: newState.optionsButtonPress
                                };
                            }
                        )}>
                            Add to Tracker
                        </Button>
                        <Button icon color="red" onClick={() => 
                            this.setState((prevState) => {
                                var newState = prevState;
                                newState.optionsButtonPress[0] = true;
                                return {
                                    optionsButtonPress: newState.optionsButtonPress
                                };
                            }
                        )}><Icon name="close" color="white" /></Button>
                    </div>
                    :
                    <Container>
                        Noted!
                    </Container>
                }
            </Card.Content>
            </Card>
            <Card>
            <Card.Content>
                <Image floated='right' size='mini' 
                src="data:image/png;base64,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" />
                <Card.Header>
                POSB
                </Card.Header>
                <Card.Meta>
                <strong>86%</strong> Suitability
                </Card.Meta>
                <Card.Description>
                POSB Everyday Savings Account
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
            {   
                    !this.state.optionsButtonPress[1] 
                    ?
                        <div className='ui one buttons'>
                        <Button basic color='green' onClick={() => 
                            this.setState((prevState) => {
                                var newState = prevState;
                                newState.optionsButtonPress[1] = true;
                                return {
                                    optionsButtonPress: newState.optionsButtonPress
                                };
                            }
                        )}>
                            Add to Tracker
                        </Button>
                        <Button icon color="red" onClick={() => 
                            this.setState((prevState) => {
                                var newState = prevState;
                                newState.optionsButtonPress[1] = true;
                                return {
                                    optionsButtonPress: newState.optionsButtonPress
                                };
                            }
                        )}><Icon name="close" color="white" /></Button>
                    </div>
                    :
                    <Container>
                        Noted!
                    </Container>
                }
            </Card.Content>
            </Card>
            <Card>
            <Card.Content>
                <Image floated='right' size='mini' 
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiH-Fez2Dio-U_XvhLmHs6nlJ5L6vq3H0GGTnaSIRkLZQ4MCQ' />
                <Card.Header>
                CitiBank
                </Card.Header>
                <Card.Meta>
                <strong>67%</strong> Suitability
                </Card.Meta>
                <Card.Description>
                InterestPlus Savings Account
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
            {   
                    !this.state.optionsButtonPress[2] 
                    ?
                        <div className='ui one buttons'>
                        <Button basic color='green' onClick={() => 
                            this.setState((prevState) => {
                                var newState = prevState;
                                newState.optionsButtonPress[2] = true;
                                return {
                                    optionsButtonPress: newState.optionsButtonPress
                                };
                            }
                        )}>
                            Add to Tracker
                        </Button>
                        <Button icon color="red" onClick={() => 
                            this.setState((prevState) => {
                                var newState = prevState;
                                newState.optionsButtonPress[2] = true;
                                return {
                                    optionsButtonPress: newState.optionsButtonPress
                                };
                            }
                        )}><Icon name="close" color="white" /></Button>
                    </div>
                    :
                    <Container>
                        Noted!
                    </Container>
                }
            </Card.Content>
            </Card>
        </Card.Group>
        } else {
            return <Container fluid  >
                <Container style={{border: '1px solid black', padding: 5, borderRadius: 5}}>
                    {c.isUser ? null: <Image avatar spaced="right" src="https://source.unsplash.com/random/21x21" />}
                    {c.message}
                    {c.isUser ? <Image avatar spaced="left "src="https://source.unsplash.com/random/20x20" /> : null}
                </Container>
            </Container>
        }
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
                                        {this.populateChatContainer(c)}
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