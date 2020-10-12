import React, { useEffect } from 'react';

const RemoveCommentFromDb = ({removeCommentId}) => {

  const removeComment = (id) => {
    fetch (`http://localhost:8000/api/comment/delete/${id}`,{
      method:'GET',
      headers: {'Content-Type':'application/json','Accept': 'application/json'},
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  useEffect(() => {
    if (removeCommentId !== '') {
      removeComment(removeCommentId)
    }
  },[removeCommentId]);

  return(
    <>
    </>
  )
}

export default RemoveCommentFromDb;