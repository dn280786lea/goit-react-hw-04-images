import React, { useState, useEffect } from 'react';
import { getImages } from './Pixabayservise/Pixabayservise';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import Button from './Button/Button';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotal] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      setIsLoading(true);
      try {
        const { hits: photos, totalHits: total_images } = await getImages(
          query,
          page
        );

        if (!photos.length) {
          setError(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setImages(prevImages => [...prevImages, ...photos]);
        setIsLoadMore(page < Math.ceil(total_images / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page, totalImages, error]);

  const handleSubmit = query => {
    if (query === '') return;

    setQuery(query);
    setImages([]);
    setPage(1);
    setTotal();
  };

  const openModal = url => {
    setUrl(url);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoadMore && <Button onClick={loadMore}>Load more</Button>}
      {url && <Modal closeModal={() => setUrl('')} url={url} />}
    </>
  );
};

export default App;
