import React, { useEffect } from 'react';

const PostReplyToDb = ({reply}) => {

  const postReply = () => {
    fetch(`http://localhost:8000/api/comment/reply/add`, {
      method: 'POST',
      headers: {'Content-Type':'application/json','Accept': 'application/json'},
      body: JSON.stringify({
        "text":reply.text,
        "date": reply.date,
        "commentId":reply.commentId,
        "replyId": reply.replyId
      })
    })
    .then(res => res.json())
    .then(res => console.log(res))
  }

  useEffect(() => {
    if(reply.length !== 0) {
      postReply()
    }
  },[reply])
  return(
    <>
    </>
  )
}

export default PostReplyToDb;