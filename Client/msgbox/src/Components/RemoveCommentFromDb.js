import React, { useEffect } from 'react';

const RemoveCommentFromDb = ({commentId}) => {

  const removeComment = (id) => {
    console.log('asdsa')
    fetch (`http://localhost:8000/api/comment/delete/${id}`,{
      method:'GET',
      headers: {'Content-Type':'application/json','Accept': 'application/json'},
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  useEffect(() => {
    if (commentId !== '') {
      removeComment(commentId)
    }
  },[commentId]);

  return(
    <>
    </>
  )
}

export default RemoveCommentFromDb;