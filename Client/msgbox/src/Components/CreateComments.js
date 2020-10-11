import React, { useEffect, useState } from 'react';
import PostComment from './PostCommet';
import RenderComments from './RenderComments'
import { Input } from '@material-ui/core';
import '../Style/Comments.css'

const CreateComments = ({ commentsFromDb }) => {
  const [ inputValue, setInputValue ] = useState('');
  const [ comment, setComment ] = useState([]);
  const [ comments, setComments ] = useState([]);

  const removeComment = id => {
    comments.map((item, index) => {
      if (item.id === id) {
        comments.splice(index, 1);
        setComments(comments => [...comments])
      }
    })
  }

  const toggleReplyState = (id) => {
    comments.map(item => {
      if (item.id === id) {
        item.replied = !item.replied
        setComments(comments => [...comments])
      }
    })
  }

  const readyToReply = commentId => {
    toggleReplyState(commentId)
  }

  const getIdRemove = (commentId) => {
    removeComment(commentId)
  }

  const saveComments = (event) => {
    event.preventDefault();
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const id = `${Math.floor(Math.random() * 100000000000)}`;
    setComment({text: inputValue, date: time, id: id, replies: [], replied: false});
    comments.push({text: inputValue, date: time, id: id, replies: [], replied: false});
    setComments(comments => [...comments]);
    setInputValue('')
  }

  useEffect(() => {
    setComments(commentsFromDb)
  },[commentsFromDb])
  console.log(comment)
  return(
    <div className="comments-wrapper">
      <PostComment comment={comment}/>
      <RenderComments comments={comments} getIdRemove={getIdRemove} readyToReply={readyToReply} />
      <div className="comments-input-wrapper">
        <Input className="comments-input" 
          placeholder="Write a comment" 
          value={inputValue} 
          onChange={event => setInputValue(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? saveComments(event): null}
          />
      </div>
    </div>
    )
}

export default CreateComments;