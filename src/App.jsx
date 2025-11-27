import './App.css';
import Header from './components/Header';
import Offer from './pages/Offer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useState} from 'react';
import Publish from './pages/Publish';
import Payment from './pages/Payment';
import Cookies from 'js-cookie';

function App() {
  const [token, setToken] = useState(Cookies.get('token') || null);
  const [search, setSearch] = useState('');
  const [values, setValues] = useState([20, 150]);

  return (
    <Router>
      <Header
        setToken={setToken}
        token={token}
        search={search}
        setSearch={setSearch}
        values={values}
        setValues={setValues}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              token={token}
              setToken={setToken}
              values={values}
              setValues={setValues}
            />
          }
        />
        <Route path="/offers/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup token={token} setToken={setToken} />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
