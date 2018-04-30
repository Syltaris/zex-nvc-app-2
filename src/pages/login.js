import React from 'react';
import {
    Container,
    Grid,
    Form,
    Label,
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
        }

        this.updateNameInput = this.updateNameInput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        })
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
                </Container>
            </Grid>
        )
    }
}

