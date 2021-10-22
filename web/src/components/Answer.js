import React from 'react'

export const Answer = ({ answer, onDelete, userId }) => (
  <aside className="answer">
    <div className="photo"><img src={answer.userPhotoURL} alt=""/></div>
    <div className="content"><p>{answer.answer}</p>
    {userId === answer.userId && (
    <button className="button right" onClick={() => onDelete(answer)}>DELETE</button>
  )}</div>  
  </aside>


)
