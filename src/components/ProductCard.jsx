import React from 'react';
import {Link} from 'react-router-dom';

const ProductCard = ({id, element}) => {
  return (
    <Link to={`offers/${id}`} className="product-card">
      {/* <div className="product-card"> */}
      <div className="info-user">
        {/* <img src={element.owner.account.avatar.secure_url} alt="Avatar" /> */}
        <p>{element.owner.account.username}</p>
      </div>
      <div className="img-container">
        <img src={element.product_image.secure_url} alt="" />
      </div>
      <div className="infos-product">
        <p>{element.product_price} €</p>

        {element.product_details.map((element, index) => {
          return <p key={index}>{element.MARQUE}</p>;
        })}

        {element.product_details.map((element, index) => {
          return <p key={index}>{element.TAILLE}</p>;
        })}
      </div>
      {/* </div> */}
    </Link>
  );
};

export default ProductCard;
