import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import {} from './ImageCallery.css';
export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem image={image} key={image.id} onClick={openModal} />
      ))}
    </ul>
  );
};
