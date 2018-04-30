import React from 'react';
import {
    Container,
    Button,
    Header,
    Grid,
    Feed,
    Card,
    Icon,
    Image,
    Modal,
    Input
} from 'semantic-ui-react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            goals : props.goals,
            chats: [],
            fetchedChats: props.chats,
            input_userChatInput: '',
            buttonPress: false,
            input_goalField: ''
        };

        this.populateLogFeed = this.populateLogFeed.bind(this);
        this.populateChatContainer = this.populateChatContainer.bind(this);

        this.updateUserChatInput = this.updateUserChatInput.bind(this);
        this.submitUserChatInput = this.submitUserChatInput.bind(this);

        this.addGoalsByButton = this.addGoalsByButton.bind(this);
        this.addGoalsByEnter = this.addGoalsByEnter.bind(this);

        this.updateGoalField = this.updateGoalField.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            chats: nextProps.chats,
            goals: nextProps.goals,
            user: nextProps.user
        })
    }

    componentDidMount() {
        setInterval(
            () => {
                if(this.state.fetchedChats.length > this.state.chats.length) {
                    var newArr = this.state.chats;
                    newArr.push(this.state.fetchedChats[this.state.chats.length]);
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

    populateLogFeed() {
        return this.state.goals && this.state.goals.map(g =>                     
                <Feed>
                    <Header>
                        <Icon name="star"/>{g.goal}
                    </Header>
                    {
                        g.logs && g.logs.map((x,i) =>
                            <Feed.Event key={i}>
                                <Feed.Label>
                                    <Icon name={i === 0 ? "circle notched" : "circle"}/>
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Summary>
                                        {x.activityDesc}
                                        <Feed.Date>
                                            {x.date.slice(0,10)}
                                        </Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra>
                                    </Feed.Extra>
                                </Feed.Content>
                            </Feed.Event>)
                        }
                </Feed>
            )
    }

        
    addGoalsByButton() {
        this.setState( (prevState) => {
            var nextState = prevState;
            var goalToPush = nextState.input_goalField;
            var newGoals = nextState.goals;
            newGoals.push({
                goal: goalToPush,
                logs: []
            });
 

            fetch("http://52.77.251.137:1337/qvlogs", {
                body: JSON.stringify({
                    date: new Date(),
                    userId: this.state.user.name,
                    interactionType: 'chat_goalInput_chat_button'
                }),
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': `Bearer `+ jwt
                }
            });

            return {
                goals: newGoals,
                input_goalField: ''
            };
        });
    }

    addGoalsByEnter(e) {
        if(e.key !== 'Enter') {return;}
        this.setState( (prevState) => {
            var nextState = prevState;
            var goalToPush = nextState.input_goalField;
            var newGoals = nextState.goals;
            newGoals.push({
                goal: goalToPush,
                logs: []
            });

            fetch("http://52.77.251.137:1337/qvlogs", {
                body: JSON.stringify({
                    date: new Date(),
                    userId: this.state.user.name,
                    interactionType: 'chat_goalInput_chat_enter'
                }),
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': `Bearer `+ jwt
                }
            });

            return {
                goals: newGoals,
                input_goalField: ''
            };
        });
    }


    updateUserChatInput(e) {this.setState({input_userChatInput: e.target.value})}
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

                fetch("http://52.77.251.137:1337/qvlogs", {
                    body: JSON.stringify({
                        date: new Date(),
                        userId: this.state.user.name,
                        interactionType: 'chat_inputEntered'
                    }),
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer `+ jwt
                    }
                })

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
                <Grid style={{marginBottom: 15}}>
                    <Grid.Row style={{paddingLeft: 30}}>
                        <Header>
                        You're currently connected with 'Chang Wei, Life Expert'.
                        </Header>
                    </Grid.Row>
                    {
                        this.state.chats && this.state.chats.map(c => 
                            <Grid.Row textAlign={c.isUser ? "right" : "left"} style={{paddingLeft: 30, paddingRight:30}}> 
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
                                                    <div>Noted!</div>
                                                    :
                                                    <div className='ui two buttons'>
                                                        <Button basic icon color="red" onClick={() => {
                                                            this.setState({buttonPress: true});
                                                            fetch("http://52.77.251.137:1337/qvlogs", {
                                                                body: JSON.stringify({
                                                                    date: new Date(),
                                                                    userId: this.state.user.name,
                                                                    interactionType: 'chat_buttonNo'
                                                                }),
                                                                method: 'POST',
                                                                headers: {
                                                                'Accept': 'application/json',
                                                                'Content-Type': 'application/json',
                                                                //'Authorization': `Bearer `+ jwt
                                                                }
                                                            })
                                                        }}>
                                                            <Icon name="remove" />
                                                        </Button>
                                                        <Button basic icon color="green" onClick={() => {
                                                            this.setState({buttonPress: true});
                                                            fetch("http://52.77.251.137:1337/qvlogs", {
                                                                body: JSON.stringify({
                                                                    date: new Date(),
                                                                    userId: this.state.user.name,
                                                                    interactionType: 'chat_buttonYes'
                                                                }),
                                                                method: 'POST',
                                                                headers: {
                                                                'Accept': 'application/json',
                                                                'Content-Type': 'application/json',
                                                                //'Authorization': `Bearer `+ jwt
                                                                }
                                                            })
                                                        }}>
                                                            <Icon name="checkmark" />
                                                        </Button>
                                                    </div>
                                                }
                                            </Card.Content>
                                        </Card>
                                        :
                                        <div style={{border: '1px solid black', padding: 5, borderRadius: 5}}>
                                            {c.isUser ? null: <Image avatar spaced="right" src="https://source.unsplash.com/random/21x21" />}
                                            {c.message}
                                            {c.isUser ? <Image avatar spaced="left "src="https://source.unsplash.com/random/20x20" /> : null}
                                        </div>
                                    }
                                </Container>
                            </Grid.Row>
                        )
                    }
                </Grid>
                <Input fluid style={{marginLeft: 10}} 
                icon="angle left" 
                onChange={this.updateUserChatInput} 
                onKeyPress={this.submitUserChatInput}
                value={this.state.input_userChatInput}/>
            </Container>
        )
    }

    updateGoalField(e) {this.setState({input_goalField: e.target.value})}

    handleOpen(info) {this.setState({infoToOpen: info, showModal: true})}
    handleClose() {this.setState({showModal: false})}

    render() {
        var x = this.state.infoToOpen;

        return (
            <Grid style={{backgroundColor:'#001f3f', height: '100vh'}}>
                <Modal
                closeOnDimmerClick={true}
                closeOnRootNodeClick={true}
                closeOnEscape
                open={this.state.showModal}
                onClose={this.handleClose}
                style={{marginTop: '50px', marginLeft: '20%'}}>
                    <Header>{x && x.title}</Header>
                    <Modal.Content>
                        {x && x.content}
                    </Modal.Content>
                    <Modal.Actions>
                        Was this useful to you?
                        <Button
                        secondary
                        onClick={() => this.handleClose()}>
                            Nah
                        </Button>
                        <Button
                        primary
                        onClick={() => this.handleClose()}>
                            Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Grid.Column width={3} style={{marginLeft: 0,  backgroundColor: 'white',}}>
                    <Container style={{paddingLeft: 10,  height: '100%'}}>
                        {this.populateLogFeed()}
                        <Input 
                        action={<Button onClick={this.addGoalsByButton}>+</Button>}
                        fluid icon="star" 
                        iconPosition="left" 
                        onKeyPress={this.addGoalsByEnter}
                        onChange={this.updateGoalField}
                        value={this.state.input_goalField}
                        style={{alignItem: 'bottom'}} />
                    </Container>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Container fluid style={{backgroundColor: 'white', paddingRight: 10, paddingBottom: 10}}>
                        {this.populateChatContainer()}
                    </Container>
                </Grid.Column>
            </Grid>

        )
    }
}