import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import banner from '../assets/img/banner.jpg';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';

const Home = ({setIsAuthenticated, search, values}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      let filters = '';

      if (search) {
        filters += '?title=' + search;
      }

      if (values[0]) {
        if (filters) {
          filters += '&priceMin=' + values[0];
        } else {
          filters += '?priceMin=' + values[0];
        }
      }

      if (values[1]) {
        if (filters) {
          filters += '&priceMax=' + values[1];
        } else {
          filters += '?priceMax=' + values[1];
        }
      }

      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers${filters}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, values]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main>
      <div className="hero-img">
        <div className="hero-ready">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <Link to={'/publish'}>
            <button className="home-ready-btn">Commencer à vendre</button>
          </Link>
        </div>
        <img src={banner} alt="" />
      </div>

      <div className="container">
        {data.offers.map((element) => {
          return (
            <ProductCard
              search={search}
              key={element._id}
              element={element}
              id={element._id}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Home;
