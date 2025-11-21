import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Signup = ({setIsAuthenticated}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newsLetter, setNewsLetter] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://lereacteur-vinted-api.herokuapp.com/user/signup',
        {
          username: username,
          email: email,
          password: password,
          newsletter: true,
        }
      );
      const token = response.data.token;

      if (token) {
        // console.log(token);
        Cookies.set('token', token, {expires: 1});
        setIsAuthenticated(true);
        setErrorMessage('');
        navigate('/');
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

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleNewsLetter = (event) => {
    const value = event.target.checked;
    setNewsLetter(value);
  };

  return (
    <div className="container-login">
      <div className="login">
        <p className="signup-text">S'inscrire</p>
        <form onSubmit={handleSubmit}>
          <div className="container-input">
            <input
              id="username"
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <input
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              type="checkbox"
              checked={newsLetter}
              onChange={handleNewsLetter}
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
