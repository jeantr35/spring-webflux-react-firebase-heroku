import React from 'react'

export const Answer = ({ answer, onDelete, userId }) => (
  <aside className="answer">
    <p>{answer.answer}</p>
    {userId === answer.userId && (
    <button className="button right" onClick={() => onDelete(answer)}>DELETE</button>
  )}
  </aside>


)
