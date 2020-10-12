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

  const toggleReplyState = id => {
    comments.map(item => {
      if (item.id === id) {
        item.replied = !item.replied
        setComments(comments => [...comments])
      }
    })
  }

  const openViewReplies = id => {
    comments.map(item => {
      if (item.id === id) {
        item.viewReplies = true
        setComments(comments => [...comments])
      }
    })
  }

  const closeViewReplies = id => {
    comments.map(item => {
      if (item.id === id) {
        item.viewReplies = false
        setComments(comments => [...comments])
      }
    })
  }


  const addReply = (reply) => {
    comments.map(item => {
      if (item.id === reply.commentId) {
        item.replies.push(reply);
        setComments(comments => [...comments])
      }
    })
  };

  const removeReply = (commentId, replyId) => {
    comments.map(item => {
      if (item.id === commentId) {
        item.replies.map((comment,index) => {
          if (comment.replyId === replyId) {
            item.replies.splice(index, 1)
            setComments(comments => [...comments]);
          }
        })
      }
    })
  };

  

  const readyToReply = commentId => {
    toggleReplyState(commentId)
  }

  const getIdRemove = (commentId) => {
    removeComment(commentId)
  }

  const getviewRepliesId = commentId => {
    openViewReplies(commentId);
  }

  const getCloseRepliesId = id => {
    closeViewReplies(id)
  }

  const getRepliesComments = (reply) => {
    addReply(reply)
  }

  const getremovedReply = (commentId, replyId) => {
    removeReply(commentId, replyId)
  }

  const saveComments = (event) => {
    event.preventDefault();
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const id = `${Math.floor(Math.random() * 100000000000)}`;
    const data = {text: inputValue, date: time, id: id, replies: [], replied: false, viewReplies: false}
    setComment(data);
    comments.push(data);
    setComments(comments => [...comments]);
    setInputValue('')
  }

  useEffect(() => {
    setComments(commentsFromDb)
  },[commentsFromDb])
  return(
    <div className="comments-wrapper">
      <PostComment comment={comment}/>
      <RenderComments comments={comments} getIdRemove={getIdRemove} readyToReply={readyToReply} getviewRepliesId={getviewRepliesId} getRepliesComments={getRepliesComments} getremovedReply={getremovedReply} getCloseRepliesId={getCloseRepliesId} />
      <div className="comments-input-wrapper">
        <input  
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