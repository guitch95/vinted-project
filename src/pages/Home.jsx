import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import banner from '../assets/img/banner.jpg';
import Cookies from 'js-cookie';

const Home = ({setIsAuthenticated}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://lereacteur-vinted-api.herokuapp.com/offers'
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        const token = Cookies.get('token');
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [setIsAuthenticated]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main>
      <img src={banner} alt="" />

      <div className="container">
        {data.offers.map((element) => {
          return (
            <ProductCard key={element._id} element={element} id={element._id} />
          );
        })}
      </div>
    </main>
  );
};

export default Home;
