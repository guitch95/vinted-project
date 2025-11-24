import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Login = ({setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://lereacteur-vinted-api.herokuapp.com/user/login',
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      if (token) {
        // console.log(token);
        Cookies.set('token', token, {expires: 1});
        setIsAuthenticated(true);
        setErrorMessage('');
        navigate('/publish');
      } else {
        setErrorMessage('Un problème est survenu...');
      }
    } catch (error) {
      error.response
        ? setErrorMessage(error.response.data.message)
        : console.log(error);
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <div className="container-login">
      <div className="login">
        <p className="signup-text">Se connecter</p>
        <form onSubmit={handleSubmit}>
          <div className="container-input">
            {errorMessage && <p>{errorMessage}</p>}
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
            />
            <button className="signup-button">Se connecter</button>
          </div>
        </form>
        <Link to="/signup" className="link">
          <p>Pas encore de compte ? Inscris toi !</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
