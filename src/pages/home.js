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
                    <Container>
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
                    <Container fluid>
                        HOmely
                    </Container>
                </Grid.Column>

            </Grid>

        )
    }
}