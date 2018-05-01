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
            input_email: '',
            error: false,
            logData: undefined,
            logsDisplay: undefined
        }

        this.updateNameInput = this.updateNameInput.bind(this);
        this.updateEmailInput = this.updateEmailInput.bind(this);
        this.populateLogs = this.populateLogs.bind(this);
    }

    componentWillMount() {
        //track visits
        fetch("http://52.77.251.137:1337/qvlogs", {
            body: JSON.stringify({
                date: new Date(),
                userId: 'visitor',
                interactionType: 'visitor'
            }),
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': `Bearer `+ jwt
            }
        });

        // fetch("http://52.77.251.137:1337/qvlogs", {
        //     method: 'GET',
        //     headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     //'Authorization': `Bearer `+ jwt
        //     }
        // })
        // .then(resp => resp.json())
        // .then(respData => this.setState({logData: respData}))
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
    updateEmailInput(e) {this.setState({input_email: e.target.value})}


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
                        <Form.Field>
                            <label>Email</label>
                            <input type="email" onChange={this.updateEmailInput}/>
                        </Form.Field>
                        For purposes of this demo, we would only require your name! If you want to receive early updates for the product you can also leave your email. :) 
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

                            fetch("http://52.77.251.137:1337/qvlogs", {
                                body: JSON.stringify({
                                    date: new Date(),
                                    userId: this.state.input_userName,
                                    interactionType: 'sign_in'
                                }),
                                method: 'POST',
                                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                //'Authorization': `Bearer `+ jwt
                                }
                            });

                            if(this.state.input_email && this.state.input_email !== '') {
                                fetch("http://52.77.251.137:1337/qvlogs", {
                                    body: JSON.stringify({
                                        date: new Date(),
                                        userId: this.state.input_email,
                                        interactionType: 'email'
                                    }),
                                    method: 'POST',
                                    headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    //'Authorization': `Bearer `+ jwt
                                    }
                                });
                            }
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

