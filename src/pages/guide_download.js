import React from 'react';
import {
    Container,
    Grid,
    Form,
    Button,
    Message
} from 'semantic-ui-react';

/* Helpers */
import { strapiCall, logAction } from '../helpers/helpers';

export default class DownloadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: props.user,
            input_userName: props.user.name || '',
            input_email: props.user.email || '',
            error: false,
            logData: undefined,
            logsDisplay: undefined
        }

        this.updateNameInput = this.updateNameInput.bind(this);
        this.updateEmailInput = this.updateEmailInput.bind(this);

        this.showDownload = this.showDownload.bind(this);
        this.showRegister = this.showRegister.bind(this);
    }

    componentWillMount() {
        //track visits
        logAction('visitor');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user,
            input_userName: nextProps.user.name,
            input_email: nextProps.user.email
        })
    }

    showRegister() {
        return (
            <Container style={{backgroundColor: '#001f3f', height: '100%'}}>
                <Container style={{backgroundColor: 'white', padding: 10}}>
                    <Form 
                    error={this.state.error}>
                        <Form.Field>
                            <label>Name</label>
                            <input onChange={this.updateNameInput} value={this.state.input_userName}/>
                        </Form.Field>
                        <Message
                        hidden={!this.state.error.error_name}
                        error
                        header="Name cannot be empty!"
                        content="Please at least input something for your name! :("/>
                        <Form.Field>
                            <label>Email</label>
                            <input type="email" onChange={this.updateEmailInput} value={this.state.input_email}/>
                        </Form.Field>
                        <Message
                        hidden={!this.state.error.error_email}
                        error
                        header="Email cannot be empty!"
                        content="Do help us by providing us your email! We won't spam it, promise! :("/>
                        To get access to the download, we just need your name and your email! :)
                    </Form>
                    <Button onClick={() => {
                        var error_name = this.state.input_userName.length <= 0;
                        var error_email = this.state.input_email.length <= 0;

                        this.setState({
                            error: {
                                error_name: error_name,
                                error_email: error_email
                            }
                        });

                        if(!error_name && !error_email) {
                            this.props.updateUser( {
                                name: this.state.input_userName,
                                email: this.state.input_email,
                                avatarUri: "https://source.unsplash.com/random/20x20"
                            })
                            logAction('sign_in', this.state.input_userName)

                            if(this.state.input_email && this.state.input_email !== '') {
                                var body = JSON.stringify({
                                    date: new Date(),
                                    userId: this.state.input_userName,
                                    interactionType: 'email'
                                });
                                strapiCall('qvlogs', body, 'POST', () => {});
                            }
                        }
                    }}>
                        Submit
                    </Button>
                </Container>
            </Container>
        );
    }

    showDownload() {
        return (
            <Container style={{backgroundColor: '#001f3f', height: '100%'}}>
                <Container style={{backgroundColor: 'white', padding: 10}}>
                    Yay
                </Container>
            </Container>
        )
    }

    updateNameInput(e) {this.setState({input_userName: e.target.value})}
    updateEmailInput(e) {this.setState({input_email: e.target.value})}


    render() {
        return (
            <Grid style={{backgroundColor:'#001f3f', height: '100%', minHeight: '94vh'}}>
                {
                    this.state.user.name && this.state.user.email 
                ?
                    this.showDownload()
                :
                    this.showRegister()
                }
            </Grid>
        )
    }
}

