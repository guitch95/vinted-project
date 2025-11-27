import React from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Signup = ({setToken}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newsLetter, setNewsLetter] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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
        setToken(true);
        setErrorMessage('');
        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate('/');
        }
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
            <div className="checkbox-container">
              <input
                className="checkbox"
                type="checkbox"
                id="checkbox"
                checked={newsLetter}
                onChange={handleNewsLetter}
              />
              <label htmlFor="checkbox">S'inscrire à notre newsletter</label>
            </div>
            <p className="terms">
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
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
