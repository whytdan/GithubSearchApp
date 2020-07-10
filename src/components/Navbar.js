import React from 'react'
import {NavLink} from 'react-router-dom'
import cx from 'classnames'

import classes from './Styles/Navbar.module.css'

export const Navbar = () => (
  <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
    <div className="navbar-brand">
      Github Search
    </div>
    <ul className={cx('navbar-nav', classes.customNav)}>
      <li className="navbar-item">
        <NavLink exact to="/" className="nav-link">Main Page</NavLink>
      </li>
      <li>
        <NavLink to="/about" className="nav-link">Info</NavLink>
      </li>
    </ul>
  </nav>
)