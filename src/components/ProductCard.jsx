import React from 'react';
import {Link} from 'react-router-dom';

const ProductCard = ({id, element}) => {
  return (
    <Link to={`offers/${id}`} className="product-card">
      <div className="info-user">
        {/* <img src={element.owner.account.avatar.secure_url} alt="Avatar" /> */}
        <p>{element.owner.account.username}</p>
      </div>
      <img src={element.product_image.secure_url} alt="" />
      <p className="description">{element.product_price} €</p>
      {element.product_details.map((element, index) => {
        return (
          <p className="description-gray" key={index}>
            {element.MARQUE}
          </p>
        );
      })}
      {element.product_details.map((element, index) => {
        return (
          <p className="description-gray" key={index}>
            {element.TAILLE}
          </p>
        );
      })}
    </Link>
  );
};

export default ProductCard;
