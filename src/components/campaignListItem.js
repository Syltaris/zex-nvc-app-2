import React from 'react';
import {
    Container,
    Item,
    List,
    Button,
    Modal
} from 'semantic-ui-react';

var CampaignListItem = ({data, showModal}) => 
    <Item
    key={data.campaignName}>
        <Item.Image
        size='tiny' 
        avatar
        centered
        src={data.campaignIconURI} />

        <Item.Content>
            <Item.Header>
                {data.campaignName}
            </Item.Header>
            <Item.Meta>
                by {data.companyName}
            </Item.Meta>
            <Item.Description>
                Goal: {data.goal.tokensReceived} / {data.goal.tokensRequested}
            </Item.Description>
            <Item.Extra>
                {data.approval.likes} Likes, {data.approval.dislikes} Dislikes, {data.comments.length} Comments
            </Item.Extra>
            <Button
            onClick={() => showModal(data)}>More Details</Button>
        </Item.Content>
    </Item>


export default CampaignListItem;