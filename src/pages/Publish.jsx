import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import {FaPlus} from 'react-icons/fa';

const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [condition, setCondition] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    const token = Cookies.get('token');

    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('size', size);
    formData.append('color', color);
    formData.append('city', city);
    formData.append('price', price);
    formData.append('picture', picture);

    try {
      const response = await axios.post(
        ' https://lereacteur-vinted-api.herokuapp.com/offer/publish',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <main>
      <div className="container-form">
        <h2>Vends tes articles</h2>
        <form onSubmit={handleSubmit}>
          <div className="section">
            <div className="file-upload">
              <label htmlFor="picture" className="file-label">
                <FaPlus />
                Ajoute une photo
              </label>
              <input
                type="file"
                name="picture"
                id="picture"
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className="section">
            <div className="input-box">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="input-box">
              <label htmlFor="description">Décris ton article</label>
              <input
                className="description-field"
                type="text"
                id="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="section">
            <div className="input-box">
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="input-box">
              <label htmlFor="size">Taille</label>
              <input
                type="text"
                id="size"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="input-box">
              <label htmlFor="color">Couleur</label>
              <input
                type="text"
                id="color"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="input-box">
              <label htmlFor="condition">Etat</label>
              <input
                type="text"
                id="condition"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="input-box">
              <label htmlFor="city">Lieu</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="section">
            <div className="input-box">
              <label htmlFor="price">Prix</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>

            {/* <input type="checkbox" id="exchange" /> */}
          </div>
          <div className="btn-container">
            <button>Ajouter</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Publish;
