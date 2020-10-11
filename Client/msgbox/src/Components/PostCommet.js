import React, { useEffect } from 'react';

const PostComment = ({comment}) => {
  const postComment = () => {
    fetch(`http://localhost:8000/api/comment/add`, {
      method: 'POST',
      headers: {'Content-Type':'application/json','Accept': 'application/json'},
      body: JSON.stringify({
        "text":comment.text,
        "date": comment.date,
        "id":comment.id,
        "replies": comment.replies,
        "replied": comment.replied,
        "viewReplies": comment.viewReplies
      })
    })
    .then(res => res.json())
    .then(res => console.log(res))
  }
  useEffect(() => {
    if(comment.length !== 0) {
      postComment()
    }
  },[comment])
  return(
    <>
    </>
  ) 
}

export default PostComment;