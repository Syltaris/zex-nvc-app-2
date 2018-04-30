import React from 'react';
import {
    Container,
    Grid,
    Feed
} from 'semantic-ui-react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid columns={9}>
                <Grid.Column width={3}>
                    <Container style={{border: '1px solid black'}}>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label>
                                    Here's a label
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Summary>
                                        Here's a summary
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Container>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Container fluid style={{border: '1px solid black'}}>
                        HOmely
                    </Container>
                </Grid.Column>

            </Grid>

        )
    }
}