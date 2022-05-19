import React from 'react';
import { Link } from 'react-router-dom';

function Icon({ iconLink, iconImage, iconName }) {
  return (
    <Link to={iconLink}>
    <img src={iconImage} alt={iconName} />
  </Link>
  );
}

export default Icon;
