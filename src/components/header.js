import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    Container,
    Menu,
    Input,
    Image,
    Label
} from 'semantic-ui-react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "Bill Ding",
                avatarUri: "https://source.unsplash.com/random/20x20"
            }
        }
    }

    render() {
        return(
            <Menu pointing secondary>
                <Container>
                    <Menu.Item>
                        GYLT
                    </Menu.Item>
                    <Menu.Item >
                        <Input iconPosition="left" icon="search" />
                    </Menu.Item>
                    <Menu.Item position="right">
                            {this.state.user && this.state.user.name}
                            <Image spaced="left" avatar src={this.state.user && this.state.user.avatarUri} />
                    </Menu.Item>
                </Container>
            </Menu>
        );
    }
}