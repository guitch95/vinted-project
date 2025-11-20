import React from 'react';
import logo from '../assets/img/logo.png';
import {Link} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import Cookies from 'js-cookie';

const Header = ({setIsAuthenticated, isAuthenticated}) => {
  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
  };
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
        {isAuthenticated ? (
          <button className="logout-btn" onClick={handleLogout}>
            Se déconnecter
          </button>
        ) : (
          <div className="button-container">
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </div>
        )}

        <button className="button-sold">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
