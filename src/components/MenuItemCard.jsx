import React from 'react';

const MenuItemCard = ({ item }) => {
  return (
    <div className="menu-item-card">
      {/* Menu item placeholder */}
      <div>{item?.name || 'Menu Item'}</div>
    </div>
  );
};

export default MenuItemCard;