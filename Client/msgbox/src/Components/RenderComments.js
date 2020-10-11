import React, { useState } from 'react';
import RemoveCommentFromDb from './RemoveCommentFromDb';
import ReplyComments from './ReplyComments';
import RenderReplyComments from './RenderReplyComments';
import Profile from '../Images/profile.jpg'
import '../Style/RenderComments.css';

const RenderComments = ({comments, getIdRemove , readyToReply, getviewRepliesId}) => {
  const [ removeCommentId, setRemoveCommentId ] = useState('');
  const [ commentId, setCommentId ] = useState('')

  const removeComment = (event) => {
    const id = event.target.getAttribute('id');
    getIdRemove( id);
    setRemoveCommentId(id);
  }

  const replyComment = (event) => {
    const id = event.target.getAttribute('id')
    readyToReply(id)
    setCommentId(id)
  }

  const viewReplies = (event) => {
    getviewRepliesId(event.target.getAttribute('id'))
  }
  return(
    <div className="render-comments-wrapper">
      {comments.length !== 0 ? 
        comments.map((item, i) =>
          <div key={i} style={item.replied ?{margin: "1vh 1vh 9vh 1vh"}: {margin:"1vh"}} className="render-comments-card">
            <div className="render-comments-img">
              <img src={Profile} alt="image" />
            </div>
            <div className="render-comments-info-wrapper">
              <div className="render-comments-info-text-date">
                <h4>{item.text}</h4>
              </div>
              <div className="render-comments-info-replies">
                <p id ={item.id} onClick={replyComment}>Reply</p>
                {item.replies.length > 0 ? <p id = {item.id} onClick={viewReplies}>view {item.replies.length} replies</p> : null } 
                <p>{item.date}</p>
                <p id = {item.id} onClick={removeComment}>Remove</p>
               
              </div>
             
            </div>
            {item.viewReplies ? <p>{item.replies[0].text}</p>: null}
            {item.replied ?
                  <ReplyComments commentId={commentId} />
                : null}
          </div>
        )
      :null}
      <RemoveCommentFromDb removeCommentId={removeCommentId}/>
    </div>
  )
}
export default RenderComments;