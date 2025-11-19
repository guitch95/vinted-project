import './App.css';
import Header from './components/Header';
import Offer from './pages/Offer';
import Home from './pages/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
