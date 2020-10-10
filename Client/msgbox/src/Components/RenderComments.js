import React, { useState } from 'react';
import RemoveCommentFromDb from './RemoveCommentFromDb'
import Profile from '../Images/profile.jpg'
import '../Style/RenderComments.css';

const RenderComments = ({comments, getIdRemove}) => {
  const [commentId, setCommentId ] = useState('')
  
  const removeComment = (e) => {
    const id = e.target.getAttribute('id');
    getIdRemove( id);
    setCommentId(id);
  }
  return(
    <div className="render-comments-wrapper">
      {comments.length !== 0 ? 
        comments.map((item, i) =>
          <div key={i} className="render-comments-card">
            <div className="render-comments-img">
              <img src={Profile} alt="image" />
            </div>
            <div className="render-comments-info-wrapper">
              <div className="render-comments-info-text-date">
                <h4>{item.text}</h4>
              </div>
              <div className="render-comments-info-replies">
                <p>Reply</p>
                <p>view 2 replies</p>
                <p>{item.date}</p>
                <p id = {item.id} onClick={removeComment}>Remove</p>
              </div>
            </div>
          </div>
        )
      :null}
      <RemoveCommentFromDb commentId={commentId}/>
    </div>
  )
}
export default RenderComments;