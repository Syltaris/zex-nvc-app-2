import React from 'react';
import {
    Container,
    Grid,
    Form,
    Button,
    Message
} from 'semantic-ui-react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: props.user,
            input_userName: '',
            error: false,
            logData: undefined,
            logsDisplay: undefined
        }

        this.updateNameInput = this.updateNameInput.bind(this);
        this.populateLogs = this.populateLogs.bind(this);
    }

    componentWillMount() {
        fetch("http://52.77.251.137:1337/qvlogs", {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': `Bearer `+ jwt
            }
        })
        .then(resp => resp.json())
        .then(respData => this.setState({logData: respData}))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        })
    }

    populateLogs() {
        var logsDisplay = {};
        this.state.logData && this.state.logData.forEach(x => 
            logsDisplay[x.interactionType] = 0
        )

        Object.keys(logsDisplay).map(x => {
            return logsDisplay[x] += 1;
        })

        return Object.keys(logsDisplay).map(x => <div>{x}:{logsDisplay[x]}</div>)
    }

    updateNameInput(e) {this.setState({input_userName: e.target.value})}

    render() {
        return (
            <Grid style={{backgroundColor:'#001f3f', height: '100vh'}}>
                <Container style={{backgroundColor: 'white'}}>
                    <Form 
                    error={this.state.error}>
                        <Form.Field>
                            <label>Username/Alias</label>
                            <input onChange={this.updateNameInput}/>
                        </Form.Field>
                        <Message
                        hidden={!this.state.error}
                        error
                        header="Name cannot be empty!"
                        content="Please at least input something for your name! :("/>
                        For purposes of this demo, we would only require your name! :)
                    </Form>
                    <Button onClick={() => {
                        var error = this.state.input_userName.length <= 0;

                        this.setState({
                            error: error,
                        });

                        if(!error) {
                            this.props.updateUser( {
                                name: this.state.input_userName,
                                avatarUri: "https://source.unsplash.com/random/20x20"
                            })
                        }
                    }}>
                        Submit
                    </Button>
                    <Container>

                </Container>
                </Container>

            </Grid>
        )
    }
}

