import React, { useState } from 'react';
import Profile from '../Images/user.png';
import { Input } from '@material-ui/core';
import PostReplyToDb from './PostReplyToDb';
import '../Style/ReplyComments.css';

const ReplyComments = ({commentId, getRepliesComments, getviewRepliesId}) => {
  const [ inputValue, setInputValue ] = useState('');
  const [ reply, setReply ] = useState([]);

  const saveReplies = (event) => {
    event.preventDefault();
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const id = `${Math.floor(Math.random() * 100000000000)}`;
    const data = {text: inputValue, date: time, commentId:commentId, replyId: id}
    setReply(data);
    getRepliesComments(data);
    getviewRepliesId(commentId);
    setInputValue('')
  }
  return(
    <div className="render-reply-comments">
      <img src={Profile} alt="image"/>
      <Input  className="render-reply-comments-input"
        placeholder="Reply"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? saveReplies(event): null}
        />
      <PostReplyToDb reply={reply} />
    </div>
  )
}

export default ReplyComments;