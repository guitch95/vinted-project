import React from 'react';
import logo from '../assets/img/logo.png';
import {Link} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo vinted" />
          </Link>
        </div>
        <div className="container-search">
          <FaSearch color="#7a7a7aff" />
          <input type="text" placeholder="Recherche des articles" />
        </div>
        <div className="button-container">
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
