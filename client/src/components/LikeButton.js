import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Label } from 'semantic-ui-react';
import { LIKE_POST_MUTATION } from '../util/graphql';

import MyPopup from '../util/MyPopup';

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false)
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
        <Button color="teal" basic>
          <Icon name="heart" />
        </Button>
      )
  ) : (
      <Button as={Link} to="/login" color="teal" basic>
        <Icon name="heart" />
      </Button>
    )

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <MyPopup
        content={liked ? 'Unlike' : 'Like'}
      >
        {likeButton}
      </MyPopup>
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  )
}

export default LikeButton;