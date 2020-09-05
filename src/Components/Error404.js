import React from 'react'
import { NavLink } from 'react-router-dom';

const Error404 = () => {

  return(
    <li className="not-found">
      <h3>This URL Doesn't Exist</h3>
      <h3>404 Error</h3>
      <p><NavLink to="/">Return Home</NavLink></p>
    </li>
  )
}

export default Error404