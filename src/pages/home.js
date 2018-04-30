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
    Modal
} from 'semantic-ui-react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            goals : props.goals,
            infos: props.infos,
            loggedIn: false,
        }

        this.populateLogFeed = this.populateLogFeed.bind(this);
        this.populateInfoContainer = this.populateInfoContainer.bind(this);

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
                                                interactionType: ''
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
                                <Button primary floated="right" onClick={() => this.handleOpen(x)}>
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
                    <Container style={{paddingLeft: 10,   height: '100%'}}>
                        {this.populateLogFeed()}
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