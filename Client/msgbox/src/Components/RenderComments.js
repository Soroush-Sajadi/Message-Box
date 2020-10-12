import React, { useState, useRef, useEffect } from 'react';
import RemoveCommentFromDb from './RemoveCommentFromDb';
import ReplyComments from './ReplyComments';
import RenderReplyComments from './RenderReplyComments';
import Profile from '../Images/user.png'
import '../Style/RenderComments.css';

const RenderComments = ({comments, getIdRemove , readyToReply, getviewRepliesId, getRepliesComments, getremovedReply, getCloseRepliesId}) => {
  const [ removeCommentId, setRemoveCommentId ] = useState('');
  const [ commentId, setCommentId ] = useState('')

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  

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

  const closeReplies = (event) => {
    getCloseRepliesId(event.target.getAttribute('id'))
  }
  useEffect(scrollToBottom, [comments]);
  return(
    <div ref={messagesEndRef} className="render-comments-wrapper">
      {comments.length !== 0 ? 
        comments.map((item, i) =>
          <div ref={messagesEndRef} key={i} style={{margin:"1vh"}} className="render-comments-card">
            <div className="render-comments-img">
              <img src={Profile} alt="image" />
            </div>
            <div className="render-comments-info-wrapper">
              <div className="render-comments-info-text-date">
                <h4>{item.text}</h4>
              </div>
              <div className="render-comments-info-replies">
                <p id ={item.id} onClick={replyComment}>Reply</p>
                {item.replies.length > 0 ? (!item.viewReplies ? <p id = {item.id} onClick={viewReplies}>view {item.replies.length} replies</p>: <p id = {item.id} onClick={closeReplies}>close replies</p> ) : null } 
                <p>{item.date}</p>
                <p id = {item.id} onClick={removeComment}>Remove</p>
              </div>
            </div>
            {item.viewReplies ? 
              <RenderReplyComments replies ={item.replies} getremovedReply={getremovedReply}  />
              : null}
            {item.replied ?
                <ReplyComments commentId={commentId} getRepliesComments={getRepliesComments} getviewRepliesId={getviewRepliesId} />
                : null}
          </div>
        )
      :null}
      <RemoveCommentFromDb removeCommentId={removeCommentId}/>
    </div>
  )
}
export default RenderComments;