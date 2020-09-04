import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);
  function likePost() {
    console.log('Like Post')
  }
  function commentPost() {
    console.log('Comment Post')
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://i.ibb.co/3mjQtF3/patrick-v2-black-bg.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='teal' basic>
            <Icon name='heart' />
          </Button>
          <Label as='a' basic color='teal' pointing='left'>
            {likeCount}
          </Label>
        </Button>
        <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
          <Button color='blue' basic>
            <Icon name='comment' />
          </Button>
          <Label as='a' basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button as="div" color="red" floated="right" onClick={() => console.log('Delete post')}>
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard;