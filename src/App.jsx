import './App.css';
import Header from './components/Header';
import Offer from './pages/Offer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useState} from 'react';
import Publish from './pages/Publish';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState('');
  const [values, setValues] = useState([20, 150]);

  return (
    <Router>
      <Header
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
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
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              values={values}
              setValues={setValues}
            />
          }
        />
        <Route path="/offers/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={
            <Signup
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/publish" element={<Publish />} />
      </Routes>
    </Router>
  );
}

export default App;
