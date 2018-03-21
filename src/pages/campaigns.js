import React from 'react';
import { 
    Button, 
    Card, 
    Container, 
    Comment,
    Item, 
    Modal, 
    Header, 
    Input,
} from 'semantic-ui-react';

import { campaignsFixtures } from '../fixtures/fixtures'

import CampaignListItem from '../components/campaignListItem';
import CommentsListItem from '../components/commentListItem';

export default class Campaigns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            campaignToShow: '',
            campaigns : []
        }

        this._showModal = this._showModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this._openModal = this._openModal.bind(this);
    }

    componentDidMount() {
        this.setState({
            campaigns: campaignsFixtures
        })
    }

    _showModal(campaignData) {
        this.setState({
            showModal: true,
            campaignToShow: campaignData,
        })
    }

    _openModal = () => this.setState({ showModal: true })
    _closeModal = () => this.setState({ showModal: false })

    render() {
        return (
            <Container>
                <Modal
                closeIcon
                onOpen={this._openModal}
                onClose={this._closeModal}
                open={this.state.showModal}
                style={{marginTop: '50px', marginLeft: '50vh'}}>
                    <Modal.Header>
                        {this.state.campaignToShow.campaignName}
                    </Modal.Header>
                    <Modal.Content>
                        <Header>Campaign Description</Header>
                        <Container>
                            {this.state.campaignToShow.campaignDescription}
                        </Container>
                        <Header>Comments</Header>
                        <Comment.Group>
                            {this.state.campaignToShow.comments && this.state.campaignToShow.comments.map((comment) => <CommentsListItem data={comment}/>)}
                        </Comment.Group>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                        secondary
                        onClick={this._closeModal}>
                            Cancel
                        </Button>
                        <Input
                        type="number"
                        label={{ basic: true, content: 'Tokens' }}
                        labelPosition='right'>
                        </Input>
                        <Button
                        primary>
                            I Pledge
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Item.Group
                divided>
                    {this.state.campaigns.map((campaignData) => <CampaignListItem data={campaignData} showModal={this._showModal}/>)}
                </Item.Group>
            </Container>
        );
    }
}