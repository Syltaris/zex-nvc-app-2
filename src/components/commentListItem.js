import React from 'react';
import {
    Container,
    Comment,
    Item,
    List,
    Button,
} from 'semantic-ui-react';

var CommentListItem = ({data}) => 
    <Comment
    key={data.campaignName}>
        <Comment.Avatar src={data.commenterAvatarURI} />
        <Comment.Content>
            <Comment.Author>
                {data.commenterName}
            </Comment.Author>
            <Comment.Text>
                {data.comment}
            </Comment.Text>
        </Comment.Content>
    </Comment>


export default CommentListItem;