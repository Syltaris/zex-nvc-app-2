import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Menu pointing secondary>
                <Menu.Item as={NavLink} exact name="home" to="/">
                    Home
                </Menu.Item>
                <Menu.Item as={NavLink} name="campaigns" to="/campaigns" >
                    Social Campaigns
                </Menu.Item>
                <Menu.Item as={NavLink} name="charities"  to="/charities" >
                    Charities
                </Menu.Item>
            </Menu>
        );
    }
}