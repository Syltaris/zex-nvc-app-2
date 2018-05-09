import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    Container,
    Menu,
    Input,
    Image,
    Button,
    Icon,
    Label,
    Grid,
} from 'semantic-ui-react';

import {logAction} from '../helpers/helpers';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({user: nextProps.user});
    }

    render() {
        return(
            <Menu secondary style={{height: '6vh'}}>
                <Container>
                    <Menu.Item as={NavLink} exact to="/">
                        <Image src="logo2.png" height="30" />
                    </Menu.Item>
                    <Menu.Item>
                    </Menu.Item>
                    <Menu.Item as={NavLink} exact to="/chat">
                        <Icon name="talk"/>
                        Get Advice
                    </Menu.Item>
                    <Menu.Item as={NavLink} exact to="/goals">
                        <Icon name="star"/>
                        Goals
                    </Menu.Item>
                    <Menu.Item as={NavLink} exact to="/download">
                        <Label as='a'>
                            <Icon name="download"/>
                            Free PDF Guide!
                        </Label>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item as={NavLink} exact to="/profile">
                        {
                            this.state.user && 
                            <div>
                                {this.state.user && this.state.user.name}
                                <Image spaced="left" avatar src={this.state.user && this.state.user.avatarUri} />
                            </div>
                        }
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}