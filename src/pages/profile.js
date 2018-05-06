import React from 'react';
import {
    Header,
    Feed,
    Icon,
    Container,
    Grid
} from 'semantic-ui-react';

/* Helpers */
import { strapiCall, logAction } from '../helpers/helpers';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            goals : props.goals,
            loggedIn: false,
            input_goalField: ''
        }

        this.addGoalsByButton = this.addGoalsByButton.bind(this);
        this.addGoalsByEnter = this.addGoalsByEnter.bind(this);

        this.updateGoalField = this.updateGoalField.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user,
            goals: nextProps.goals,
        })
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
 
            var body =  JSON.stringify({
                date: new Date(),
                userId: this.state.user.name,
                interactionType: 'chat_goalInput_main_button'
            });
            strapiCall('qvlogs', body, 'POST', () => {});

            return {
                goals: newGoals,
                input_goalField: ''
            };
        });
    }

    addGoalsByEnter(e) {
        if(e.key !== 'Enter') {return;}
        this.setState( (prevState) => {
            var nextState = prevState;
            var goalToPush = nextState.input_goalField;
            var newGoals = nextState.goals;
            newGoals.push({
                goal: goalToPush,
                logs: []
            });
            logAction( 'chat_goalInput_main_enter', this.state.user.name);

            return {
                goals: newGoals,
                input_goalField: ''
            };
        });
    }

    updateGoalField(e) {this.setState({input_goalField: e.target.value})}

    render() {
        return this.state.goals && this.state.goals.map(g =>     
            <Grid style={{backgroundColor:'#001f3f'}}> 
                <Container style={{backgroundColor: 'white', height: '100%', minHeight: '94vh'}}>               
                    <Feed style={{marginTop: 10}}>
                        <Header>
                            <Icon name="star"/>{g.goal}
                        </Header>
                        {
                            g.logs && g.logs.sort((a,b) => new Date(a.date) - new Date(b.date)).map((x,i) =>
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
                </Container>
            </Grid>
        )
    }
}