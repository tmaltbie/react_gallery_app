import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => {

  return (
    <nav className="main-nav">
      <ul>
      <li><Link to="/cats">Cats</Link></li>
      <li><Link to="/coffee">Coffee</Link></li>
      <li><Link to="/cows">Cows</Link></li> 
      </ul>
    </nav>
  )
}

export default Nav
