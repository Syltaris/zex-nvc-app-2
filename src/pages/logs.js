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

import {strapiCall} from '../helpers/helpers';

export default class LogsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: null
        }

        this.populateLogs = this.populateLogs.bind(this);
    }

    componentDidMount() {
        strapiCall('qvlogs', null, 'GET', (respData) => this.setState({logs: respData}));
    }

    populateLogs() {
        var interactionTypes = {};
        this.state.logs && this.state.logs.map(log => {
            var key = log.interactionType;
            interactionTypes[key] = 0; //init keys
        });

        this.state.logs && this.state.logs.map(log => {
            var key = log.interactionType;
            interactionTypes[key] = interactionTypes[key] + 1;   
        });

        return(
            <Container fluid style={{backgroundColor: 'white'}}>
                Logs: 
                    {
                        Object.keys(interactionTypes).map(key => 
                            <Grid.Row columns={6}>
                                <Grid.Column width={1}>
                                    {key}:
                                </Grid.Column>
                                <Grid.Column width={1}>
                                    {interactionTypes[key]}
                                </Grid.Column>
                            </Grid.Row>
                        )
                        // this.state.logs.map(log => {
                        //     return Object.keys(log).map(key =>
                        //         <Grid.Row>
                        //             {key}: {log.key}
                        //         </Grid.Row>
                        //     );
                        // })
                    }
            </Container>
        );
    }

    render() {
        return (
            <Grid style={{backgroundColor:'#001f3f', height: '100%', minHeight: '94vh'}}>
                <Container style={{backgroundColor:'#001f3f', height: '100%'}}>
                    {this.populateLogs()}
                </Container>
            </Grid>
        )
    }
}