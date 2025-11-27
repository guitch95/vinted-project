import React from 'react';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';

const Offer = () => {
  const {id} = useParams();
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Chargement....</p>
  ) : (
    <section>
      <div className="container-offer">
        <div className="container-img">
          <img src={offer.product_image.secure_url} alt="" />
        </div>
        <div className="container-info">
          <div className="container-info-high">
            <p className="price">{offer.product_price}€</p>

            <div className="container-info-high-details">
              {offer.product_details.map((element, index) => {
                return (
                  element.MARQUE && <p key={index}> MARQUE: {element.MARQUE}</p>
                );
              })}
              {offer.product_details.map((element, index) => {
                return element.TAILLE ? (
                  <p key={index}> TAILLE: {element.TAILLE}</p>
                ) : (
                  ''
                );
              })}
              {offer.product_details.map((element, index) => {
                return element.ÉTAT ? (
                  <p key={index}> ÉTAT: {element.ÉTAT}</p>
                ) : (
                  ''
                );
              })}
              {offer.product_details.map((element, index) => {
                return element.COULEUR ? (
                  <p key={index}> COULEUR: {element.COULEUR}</p>
                ) : (
                  ''
                );
              })}
              {offer.product_details.map((element, index) => {
                return element.EMPLACEMENT ? (
                  <p key={index}> EMPLACEMENT: {element.EMPLACEMENT}</p>
                ) : (
                  ''
                );
              })}
            </div>
          </div>
          <div className="container-info-low">
            <div className="container-info-low-description">
              <p>{offer.product_name}</p>
              <p>{offer.product_description}</p>
              <p>{offer.owner.account.username}</p>
            </div>
            <Link
              to={'/payment'}
              state={{
                price: offer.product_price,
                title: offer.product_name,
                from: `/offers/${id}`,
              }}>
              <button>Acheter</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
