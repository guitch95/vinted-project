import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Login = ({setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://lereacteur-vinted-api.herokuapp.com/user/login',
        {
          email: email,
          password: password,
        }
      );
      const token = response.data.token;
      console.log(token);
      Cookies.set('token', token, {expires: 1});
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.message);
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
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              name="password"
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
