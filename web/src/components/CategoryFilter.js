import React from "react";
import { Link } from 'react-router-dom'


export const CategoryFilter = () => (
        <nav id="filterCategory">
          <section>
            <Link to="/questions">ALL</Link>
            <Link to="/questionFilter/category/TECHNOLOGY-AND-COMPUTER">TECH</Link>
            <Link to="/questionFilter/category/SCIENCES">SCIENCE</Link>
            <Link to="/questionFilter/category/SOFTWARE-DEVELOPMENT">SOFTWARE DEV</Link>
            <Link to="/questionFilter/category/SOCIAL-SCIENCES">SOCIAL</Link>
            <Link to="/questionFilter/category/LANGUAGE">LANGUAGE</Link>
          </section>
        </nav>
)
