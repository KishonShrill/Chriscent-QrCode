import React, { useState, useEffect } from 'react';
import { fetchEntities } from './api.jsx'; // Adjust the import path as needed
import './entities.css';

const EntityProfile = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEntities = await fetchEntities();
        setEntities(fetchedEntities);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container__list' >
      <h2>Product List</h2>
      {loading ? (
        <p>Loading Entities...</p>
      ) : (
        <ul>
          {entities.map((entity) => (
            <li key={entity.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntityProfile;