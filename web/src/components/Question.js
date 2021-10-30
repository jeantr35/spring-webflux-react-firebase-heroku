import React from 'react'
import { Link } from 'react-router-dom'

export const Question = ({ question, excerpt, onDelete, onEdit }) => (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
  <div className="photo"><img src={question.userPhotoURL} alt=""/></div>
    <div className="content">
    <h2>{question.question}</h2>
    <p>{question.category}  - <small>{question.type}</small></p>
   
    {onDelete && (
      <button className="button right" onClick={() => onDelete(question.id)}>DELETE</button>
    )}

    {onEdit && (
      <button className="button right" onClick={() => onEdit(question)}>EDIT</button>
    )}

    {excerpt && (
      <Link to={`/question/${question.id}`} className="button">
        View Question
      </Link>
    )}
    </div> 
  </article>
)
