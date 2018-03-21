import React from 'react';
import { browserHistory } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

export default class Header extends React.Component {
    render() {
        return(
            <Container>
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/campaigns">Social Campaigns</NavLink>
                <NavLink className="nav-link" to="/charities">Charities</NavLink>
            </Container>
        );
    }
}