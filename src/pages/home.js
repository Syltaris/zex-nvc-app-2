import React from 'react';
import {
    Container,
    Button,
    Header,
    Grid,
    Icon,
    Item,
    Modal,
} from 'semantic-ui-react';

/* Helpers */
import { logAction } from '../helpers/helpers';

import Goals from '../pages/goals';

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

        this.populateInfoContainer = this.populateInfoContainer.bind(this);

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
                                        logAction('button_alreadyKnow'+x.title, this.state.user.name);
                                    }}>
                                        I already know this
                                    </Button>
                                }
                                <Button primary floated="right" onClick={() => {
                                    this.handleOpen(x);
                                    logAction('button_readMore', this.state.user.name);
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
            <Grid style={{backgroundColor:'#001f3f', height: '100%', minHeight: '94vh'}}>
                <Container style={{backgroundColor:'#001f3f', height: '100%'}}>
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
                                logAction('button_alreadyKnow_nah_'+x.title, this.state.user.name);
                            }}>
                                Nah
                            </Button>
                            <Button
                            primary
                            onClick={() => {
                                this.handleClose();
                                logAction('button_alreadyKnow_yes_'+x.title, this.state.user.name);
                            }}>
                                Yes
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    <Container fluid style={{backgroundColor: 'white', marginTop: 10,paddingRight: 10, paddingBottom: 10}}>
                        {this.populateInfoContainer()}
                    </Container>
                </Container>
            </Grid>

        )
    }
}