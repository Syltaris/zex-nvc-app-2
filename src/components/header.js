import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    Container,
    Menu,
    Input,
    Image,
    Button,
    Icon
} from 'semantic-ui-react';

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
            <Menu  pointing secondary >
                <Container>
                    <Menu.Item as={NavLink} exact to="/" >
                        <Image src="logo2.png" height="30" />
                    </Menu.Item>
                    <Menu.Item >
                        <Input iconPosition="left" icon="search" />
                        <NavLink exact to="/chat">
                            <Button  icon marginBottom={10} marginRight={10}>
                                <Icon  name="talk"/>
                            </Button>
                        </NavLink>
                    </Menu.Item>
                    {
                        this.state.user && 
                        <Menu.Item position="right">
                            {this.state.user && this.state.user.name}
                            <Image spaced="left" avatar src={this.state.user && this.state.user.avatarUri} />
                        </Menu.Item>
                    }

                </Container>
            </Menu>
        );
    }
}