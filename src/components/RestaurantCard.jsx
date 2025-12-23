import React from 'react';

const RestaurantCard = ({ restaurant }) => {
  return (
    <article className="restaurant-card">
      {/* Restaurant card placeholder */}
      <h3>{restaurant?.name || 'Restaurant'}</h3>
    </article>
  );
};

export default RestaurantCard;