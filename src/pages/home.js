import React from 'react';
import {
    Container,
    Button,
    Header,
    Grid,
    Feed,
    Icon,
    Item,
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
            infos: props.infos,
            loggedIn: false,
            input_goalField: ''
        }

        this.populateLogFeed = this.populateLogFeed.bind(this);
        this.populateInfoContainer = this.populateInfoContainer.bind(this);

        this.addGoalsByButton = this.addGoalsByButton.bind(this);
        this.addGoalsByEnter = this.addGoalsByEnter.bind(this);

        this.updateGoalField = this.updateGoalField.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            goals: nextProps.goals,
            infos: nextProps.infos,
            user: nextProps.user
        })
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
                    interactionType: 'chat_goalInput_main_button'
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
        if(e.key != 'Enter') {return;}
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
                    interactionType: 'chat_goalInput_main_enter'
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

    populateInfoContainer() {
        return (
            <Container>
                <Header>
                    Based on your profile, we figured you may not know about:
                </Header>
                <Item.Group divided>
                {
                    this.state.infos && this.state.infos.map((x,i) => 
                        <Item>
                            <Item.Image src={x.imageUri} />
                            <Item.Content>
                                <Item.Header>
                                    {x.title}
                                </Item.Header>
                                <Item.Description>
                                {x.desc}
                                </Item.Description>
                                <Item.Extra marginBottom={0}>
                                {
                                    x.userAware 
                                    ?
                                    <Button>
                                        <Icon name="checkmark" />
                                        Thanks for your feedback!
                                    </Button>
                                    :
                                    <Button onClick={() => {
                                        this.setState((prevState) => {
                                            var nextState = prevState;
                                            nextState.infos[i].userAware = true;
                                            return {
                                                infos:  prevState.infos
                                            }
                                        });

                                        fetch("http://52.77.251.137:1337/qvlogs", {
                                            body: JSON.stringify({
                                                date: new Date(),
                                                userId: this.state.user.name,
                                                interactionType: 'button_alreadyKnow'
                                            }),
                                            method: 'POST',
                                            headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            //'Authorization': `Bearer `+ jwt
                                            }
                                        })

                                    }}>
                                        I already know this
                                    </Button>
                                }
                                <Button primary floated="right" onClick={() => {
                                    this.handleOpen(x);
                                    
                                    fetch("http://52.77.251.137:1337/qvlogs", {
                                        body: JSON.stringify({
                                            date: new Date(),
                                            userId: this.state.user.name,
                                            interactionType: 'button_readMore'
                                        }),
                                        method: 'POST',
                                        headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        //'Authorization': `Bearer `+ jwt
                                        }
                                    })
                                }}>
                                    Read More
                                </Button>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                }
            </Item.Group>
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
                        onClick={() => {
                            this.handleClose();
                            
                            fetch("http://52.77.251.137:1337/qvlogs", {
                                body: JSON.stringify({
                                    date: new Date(),
                                    userId: this.state.user.name,
                                    interactionType: 'button_alreadyKnow_nah'
                                }),
                                method: 'POST',
                                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                //'Authorization': `Bearer `+ jwt
                                }
                            })
                        }}>
                            Nah
                        </Button>
                        <Button
                        primary
                        onClick={() => {
                            this.handleClose();
                            
                            fetch("http://52.77.251.137:1337/qvlogs", {
                                body: JSON.stringify({
                                    date: new Date(),
                                    userId: this.state.user.name,
                                    interactionType: 'button_alreadyKnow_yes'
                                }),
                                method: 'POST',
                                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                //'Authorization': `Bearer `+ jwt
                                }
                            })
                        }}>
                            Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Grid.Column width={3} style={{marginLeft: 0,  backgroundColor: 'white',}}>
                    <Container style={{paddingLeft: 10,   height: '100%'}}>
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
                        {this.populateInfoContainer()}
                    </Container>
                </Grid.Column>
            </Grid>

        )
    }
}