import React, { useState } from 'react';
import Profile from '../Images/profile.jpg';
import { Input } from '@material-ui/core';
import PostReplyToDb from './PostReplyToDb';
import '../Style/ReplyComments.css';

const ReplyComments = ({commentId}) => {
  const [ inputValue, setInputValue ] = useState('');
  const [ reply, setReply ] = useState([]);

  const saveReplies = (event) => {
    event.preventDefault();
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const id = `${Math.floor(Math.random() * 100000000000)}`;
    const data = {text: inputValue, date: time, commentId:commentId, replyId: id}
    setReply(data)
    setInputValue('')
  }
  return(
    <div className="render-reply-comments">
      <img src={Profile} alt="image"/>
      <Input  className="render-reply-comments-input"
        placeholder="Write your comment"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? saveReplies(event): null}
        />
      <PostReplyToDb reply={reply} />
    </div>
  )
}

export default ReplyComments;