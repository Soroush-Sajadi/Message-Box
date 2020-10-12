import React from 'react';
import Profile from '../Images/profile.jpg';
import '../Style/RenderReplyComments.css';


const RenderReplyComments = ({replies}) => {
  return(
    <div className="render-reply-comments-wrapper">
      {replies.map((item, index) => 
           <div key={index} className="render-reply-comments-card">
            <div className="render-reply-comments-img">
              <img src={Profile} alt="image" />
            </div>
            <div className="render-reply-comments-info-wrapper">
              <div className="render-reply-comments-info-text">
                <h4>{item.text}</h4>
              </div>
              <div className="render-reply-comments-info-date">
                <p>{item.date}</p>
                <p id = {item.id} >Remove</p>
              </div>
            </div>
          </div>
      )}
    </div>
  )
}

export default RenderReplyComments;