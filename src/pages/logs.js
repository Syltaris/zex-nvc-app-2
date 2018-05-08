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
            logs: []
        }

        this.populateLogs = this.populateLogs.bind(this);
    }

    componentDidMount() {
        strapiCall('qvlogs?_limit=999999&date_lt=2018-05-06', null, 'GET', (respData) => this.setState({
            logs: respData
        }));

        strapiCall('qvlogs?_limit=999999&date_gt=2018-05-08', null, 'GET', (respData) => {
            this.setState((prevState) => {
                var newLogs = prevState.logs;
                respData.map(x => newLogs.push(x));
                return {
                    logs: newLogs
                }
            })
        });
        // var logs = []
        // var today = new Date();
        // let todayDay = today.getDay();
        // for(var day=1; day<=10; day++) {
        //     strapiCall('qvlogs/?date_lte='+'2018-05-0'+parseInt(day)+'&date_gte=2018-05-0'+parseInt(day-1), null, 'GET', (respData) => {
        //         respData.map(key => {
        //             this.setState((prevState) => {
        //                 var newState = prevState;
        //                 newState.logs.push(key);
        //                 return{
        //                     logs: newState.logs
        //                 }
        //             });
        //         })
        //     });
        // }

        // this.setState({logs: logs})
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

        var interactionTypes2 = {};
        this.state.logs && this.state.logs.map(log => {
            var key = log.date;
            interactionTypes2[key] = log;
        })

        var interactionTypes3 = {};
        this.state.logs && this.state.logs.map(log => {
            var key = log.userId;
            interactionTypes3[key] = [];
        })
        this.state.logs && this.state.logs.map(log => {
            var key = log.userId;
            interactionTypes3[key].push(log);
        })

        return(
            <Container fluid style={{backgroundColor: 'white'}}>
                Logs: {this.state.logs && this.state.logs.length}
                    <Grid>
                    {
                        Object.keys(interactionTypes).map(key => 
                            <Grid.Row columns={16}>
                                <Grid.Column width={8}>
                                    <Container>
                                        {key}:
                                    </Container>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Container>
                                        {interactionTypes[key]}
                                    </Container>
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
                    {
                        Object.keys(interactionTypes3).map((user, index)=> 
                            <Grid.Row columns={16} >
                                <Grid.Column width={3}>
                                    <Container>
                                        {index}:{user}
                                    </Container>
                                </Grid.Column>
                                <Grid.Column width={13}>
                                    <Grid>
                                        {interactionTypes3[user].map(x => 
                                            <Grid.Row columns={13}>
                                                <Grid.Column width={5}>
                                                    {x.date}
                                                </Grid.Column>
                                                <Grid.Column width={5}>
                                                    {x.interactionType}
                                                </Grid.Column>
                                            </Grid.Row>
                                        )}
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        )
                    }
                    {
                        Object.keys(interactionTypes2).map(date => 
                            <Grid.Row columns={16} >
                                <Grid.Column width={3}>
                                    <Container>
                                        {date}
                                    </Container>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Container>
                                        {interactionTypes2[date].userId}
                                    </Container>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Container>
                                        {interactionTypes2[date].interactionType}
                                    </Container>
                                </Grid.Column>
                            </Grid.Row>
                        )
                    }
                    </Grid>
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