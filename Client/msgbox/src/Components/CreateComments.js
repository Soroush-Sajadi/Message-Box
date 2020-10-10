import React, { useState } from 'react';
import PostComment from './PostCommet';
import RenderComments from './RenderComments'
import { Input } from '@material-ui/core';
import '../Style/Comments.css'

const CreateComments = () => {
  const [ inputValue, setInputValue ] = useState('');
  const [ comment, setComment ] = useState([]);
  const [ comments, setComments ] = useState([]);

  const removeComment = (id) => {
    comments.map((item, index) => {
      if (item.id === id) {
        comments.splice(index, 1);
        setComments(comments => [...comments])
      }
    })
  }

  const getIdRemove = (commentId) => {
    removeComment(commentId)
  }

  const saveComments = () => {
    const id = `${Math.floor(Math.random() * 100000000000)}`;
    setComment({text: inputValue, date: '2020/10/9', id: id, replay: ''});
    comments.push({text: inputValue, date: '2020/10/9', id: id, replay: ''});
    setComments(comments => [...comments]);
    setInputValue('')
  }

  return(
    <div className="comments-wrapper">
      <PostComment comment={comment}/>
      <RenderComments comments={comments} getIdRemove={getIdRemove} />
      <Input className="comments-input" placeholder="Write a comment" value={inputValue} onChange={event => setInputValue(event.target.value)}/>
      <Input className="comments-button" type="submit" value="Send" onClick={saveComments} />
    </div>
    )
}

export default CreateComments;