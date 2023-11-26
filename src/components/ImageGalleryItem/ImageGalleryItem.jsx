import React from 'react';
import {} from './ImageGalleryItem.css';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="image"
        src={image.webformatURL}
        alt={image.tags}
        id={image.id}
        onClick={() => onClick(image.webformatURL)}
      />
    </li>
  );
};
