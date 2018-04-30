import React from 'react';
import {
    Container,
    Button,
    Header,
    Grid,
    Feed,
    Icon,
    Item,
    Image
} from 'semantic-ui-react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goals : [
                {
                    goal: "Get house by 30",
                    logs: [
                        {
                            activityDesc: 'Met expert regarding financial report on savings plan.',
                            date: '03/03/2018'
                        },
                        {
                            activityDesc: 'Started to think about savings plan.',
                            date: '01/03/2018'
                        }
                    ]
                }
            ],
            infos: [
                {
                    userAware: false,
                    title: "Know the forms you need to settle when buying a house?",
                    imageUri: "https://source.unsplash.com/collection/226405/100x100",
                    desc: "Buying a house is hard enough, filling up the paperwork that comes with it is even worse. Find out all the paperwork you need to settle when doing so.",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in lorem condimentum justo placerat faucibus in non nisl. Phasellus dictum vestibulum lacus sed sodales. Curabitur id turpis consectetur, dapibus ante a, pulvinar magna. Aliquam erat volutpat. Vestibulum rutrum neque neque, vel posuere leo laoreet eu. Morbi sit amet sem arcu. Cras dictum ex id cursus commodo. Proin ante nisi, volutpat ac metus in, consequat venenatis neque. Donec suscipit placerat sagittis. Nam viverra dui eros, nec placerat libero suscipit id. Ut ultrices auctor justo eu ullamcorper. In ac fringilla enim.",
                },
                {
                    userAware: false,
                    title: "Health risks and the coverage you already have.",
                    imageUri: "https://source.unsplash.com/collection/539469/100x100",
                    desc: "Do you know what your insurance can really cover you for? Find out more about the details of managing all the insruance for your health.",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in lorem condimentum justo placerat faucibus in non nisl. Phasellus dictum vestibulum lacus sed sodales. Curabitur id turpis consectetur, dapibus ante a, pulvinar magna. Aliquam erat volutpat. Vestibulum rutrum neque neque, vel posuere leo laoreet eu. Morbi sit amet sem arcu. Cras dictum ex id cursus commodo. Proin ante nisi, volutpat ac metus in, consequat venenatis neque. Donec suscipit placerat sagittis. Nam viverra dui eros, nec placerat libero suscipit id. Ut ultrices auctor justo eu ullamcorper. In ac fringilla enim.",
                }
            ]
        }

        this.populateLogFeed = this.populateLogFeed.bind(this);
        this.populateInfoContainer = this.populateInfoContainer.bind(this);
    }

    populateLogFeed() {
        return this.state.goals.map(g =>                     
                <Feed>
                    <Icon name="star"/>{g.goal}
                    {
                        g.logs.map((x,i) =>
                            <Feed.Event key={i}>
                                <Feed.Label>
                                    <Icon name={i === 0 ? "circle notched" : "circle"}/>
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Summary>
                                        {x.activityDesc}
                                        <Feed.Date>
                                            {x.date}
                                        </Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra>
                                    </Feed.Extra>
                                </Feed.Content>
                            </Feed.Event>)
                        }
                </Feed>
            )
    }

    populateInfoContainer() {
        return (
            <Container>
                <Header>
                    Based on your profile, we figured you may not know about:
                </Header>
                <Item.Group divided>
                {
                    this.state.infos.map((x,i) => 
                        <Item>
                            <Item.Image src={x.imageUri} />
                            <Item.Content>
                                <Item.Header>
                                    {x.title}
                                </Item.Header>
                                <Item.Description>
                                {x.desc}
                                </Item.Description>
                                <Item.Extra marginBottom={0}>
                                {
                                    x.userAware 
                                    ?
                                    <Button>
                                        <Icon name="checkmark" />
                                        Thanks for your feedback!
                                    </Button>
                                    :
                                    <Button onClick={() => 
                                        this.setState((prevState) => {
                                            var nextState = prevState;
                                            nextState.infos[i].userAware = true;
                                            return {
                                                infos:  prevState.infos
                                            }
                                        } )
                                    }>
                                        I already know this
                                    </Button>
                                }

                                    <Button primary floated="right">
                                        Read More
                                    </Button>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                }
            </Item.Group>
            </Container>
        )
    }

    render() {
        return (
            <Grid style={{backgroundColor:'#001f3f', height: '100vh'}}>
                <Grid.Column width={3} style={{marginLeft: 0,  backgroundColor: 'white',}}>
                    <Container style={{  height: '100%'}}>
                        {this.populateLogFeed()}
                    </Container>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Container fluid style={{backgroundColor: 'white',}}>
                        {this.populateInfoContainer()}
                    </Container>
                </Grid.Column>
            </Grid>

        )
    }
}