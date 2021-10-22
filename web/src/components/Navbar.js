import React from 'react'
import { Link } from 'react-router-dom'

export const PublicNavbar = () => (
  <nav>
    <section>
      <Link to="/"><img src="https://www.pikpng.com/pngl/m/586-5862540_free-question-and-answer-png-q-a-clip.png" alt="" width="40" height="30" /></Link>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
    </section>
  </nav>
)

export const PrivateNavbar = () => (
  <nav>
    <section>
    <Link to="/"><img src="https://www.pikpng.com/pngl/m/586-5862540_free-question-and-answer-png-q-a-clip.png" alt="" width="40" height="30" /></Link>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
      <Link to="/new">New</Link>
      <Link to="/list">List</Link>
    </section>
  </nav>
)
