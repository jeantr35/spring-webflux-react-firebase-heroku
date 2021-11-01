import React from 'react'

export const Answer = ({ answer, onDelete, userId, handleButton }) => (
  <aside className="answer">
    <div className="photo"><img src={answer.userPhotoURL} alt=""/></div>
    <div className="content"><p>{answer.answer}</p>
    {userId === answer.userId && (
    <button className="button right" onClick={() => onDelete(answer)}>DELETE</button>
  )}
    {userId && <button className="button right" onClick={() => handleButton(userId, answer.id, answer.questionId, true)}>+1</button>}
    <p className="button"> Score: {answer.position}</p>
    {userId && <button className="button right" onClick={() => handleButton(userId, answer.id, answer.questionId, false)}>-1</button>}
  </div>  
  </aside>


)
