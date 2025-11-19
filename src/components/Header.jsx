import React from 'react';
import logo from '../assets/img/logo.png';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo vinted" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
