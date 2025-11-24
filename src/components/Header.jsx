import React from 'react';
import logo from '../assets/img/logo.png';
import {Link} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import Cookies from 'js-cookie';
import SliderRange from './Range';

const Header = ({
  setIsAuthenticated,
  isAuthenticated,
  search,
  setSearch,
  values,
  setValues,
}) => {
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
        <div className="filter-search">
          <div className="container-search">
            <FaSearch color="#7a7a7aff" />
            <input
              type="text"
              placeholder="Recherche des articles"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          <SliderRange values={values} setValues={setValues} />
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

        <Link to={'/publish'}>
          {' '}
          <button className="button-sold">Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
