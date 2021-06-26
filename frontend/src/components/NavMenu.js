import React from "react";

const NavMenu = () => {
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        <li className='nav__list-item'>
          <a href='#' className='nav__list-link'>
            About
          </a>
        </li>
        <li className='nav__list-item'>
          <a href='#' className='nav__list-link'>
            How it works
          </a>
        </li>
        <li className='nav__list-item'>
          <a href='#' className='nav__list-link'>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
