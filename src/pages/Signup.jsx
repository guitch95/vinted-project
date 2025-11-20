import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Signup = ({setIsAuthenticated}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://lereacteur-vinted-api.herokuapp.com/user/signup',
        {
          username: username,
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

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  return (
    <div className="container-login">
      <div className="login">
        <p className="signup-text">S'inscrire</p>
        <form onSubmit={handleSubmit}>
          <div className="container-input">
            <input
              name="username"
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={handleUsernameChange}
            />
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
            <button className="signup-button">S'inscrire</button>
          </div>
        </form>
        <Link to="/login" className="link">
          <p>Tu as déjà un compte ? Connecte toi !</p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
