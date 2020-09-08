import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Image, Card, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const {
    loading,
    data,
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  function deletePostCallback() {
    props.history.push('/')
  }

  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount }
      = data.getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated='right'
              size='mini'
              src='https://i.ibb.co/3mjQtF3/patrick-v2-black-bg.png'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log('comment on post')}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  <Card.Header>
                    {comment.username}
                  </Card.Header>
                  <Card.Meta>
                    {moment(comment.createdAt).fromNow()}
                  </Card.Meta>
                  <Card.Description>
                    {comment.body}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!){
    getPost(postId: $postId) {
      id body createdAt username likeCount
      likes{
        username
      }
      commentCount
      comments{
        id username createdAt body
      }
    }
  }
`;

export default SinglePost;