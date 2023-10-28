import axios from 'axios';
import React, { useRef, useState, forwardRef, useEffect } from 'react';

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const EntityProfile = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const ENTITITY_API_URL = 'http://localhost:5000/api/entities'; // Update the URL if needed

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await axios.get(ENTITITY_API_URL);
        const fetchedEntities = response.data;
        setEntities(fetchedEntities);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchEntity();
  });

  const desiredEntity = entities.find(entity => entity.id === "2022-0362");

  return (
    <div className='container__list' >
      <h2>Product List</h2>
      {loading ? (
        <p>Loading Entities...</p>
      ) : (
        <ul>
          <li>
            {desiredEntity.name} - ${desiredEntity.id}
          </li>
        </ul>
      )}
    </div>
  );
};

export default EntityProfile;