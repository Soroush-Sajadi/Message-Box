import React, { useEffect } from 'react';
import RenderReplyComments from './RenderReplyComments';

const RemoveReplyFromDb = ({ commentId, replyId }) => {

  const removeReply = (commentId, replyId) => {
    fetch(`http://localhost:8000/api/comment/reply/delete/${commentId}/${replyId}`)
  }
  useEffect(() => {
    if (commentId !== '' && replyId !== '') {
      removeReply(commentId, replyId)
    }
  },[commentId, replyId])
  return(
    <>
    </>
  )
}

export default RemoveReplyFromDb;