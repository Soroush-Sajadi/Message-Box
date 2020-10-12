import React, { useEffect, useState } from 'react';
import CreateComments from './CreateComments';

const GetCommentsFromDb = () => {
  const [ comments, setComments ] = useState([]);
  const getComments = async () => {
    await fetch(`http://localhost:8000/api/comments`, {
      method:'GET',
      headers: {'Content-Type':'application/json','Accept': 'application/json'}
    })
      .then(res => res.json())
      .then(res => setComments(res !== null ? res : [] ))
  }
  

  useEffect(() => {
    getComments()
  },[])
  return(
    <>
      <CreateComments commentsFromDb = {comments}/>
    </>
  )
}

export default GetCommentsFromDb;