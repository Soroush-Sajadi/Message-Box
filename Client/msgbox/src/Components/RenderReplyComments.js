import React, { useState } from 'react';
import RemoveReplyFromDb from './RemoveReplyFromDb';
import Profile from '../Images/user.png';
import '../Style/RenderReplyComments.css';


const RenderReplyComments = ({replies, getremovedReply}) => {
  const [ replyId, setReplyId ] = useState('');
  const [ commentId, setCommentId ] = useState('');


  const removeReply = (event) => {
    const comment_id = event.target.getAttribute('commentid')
    const reply_id = event.target.getAttribute('replyid')
    getremovedReply(comment_id, reply_id);
    setCommentId(comment_id);
    setReplyId(reply_id);
  }
  return(
    <div className="render-reply-comments-wrapper">
      {replies.map((item, index) => 
           <div key={index} className="render-reply-comments-card">
            <div className="render-reply-comments-img">
              <img src={Profile} alt="image" />
            </div>
            <div className="render-reply-comments-info-wrapper">
              <div className="render-reply-comments-info-text">
                <h4>{item.text}</h4>
              </div>
              <div className="render-reply-comments-info-date">
                <p>{item.date}</p>
                <p replyid = {item.replyId} commentid = {item.commentId}  onClick={removeReply} >Remove</p>
              </div>
            </div>
          </div>
      )}
      <RemoveReplyFromDb commentId = {commentId} replyId ={replyId}/>
    </div>
  )
}

export default RenderReplyComments;