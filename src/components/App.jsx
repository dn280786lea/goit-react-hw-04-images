import React, { Component } from 'react';
import { getImages } from './Pixabayservise/Pixabayservise';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import Button from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalImages: 0,
    isLoadMore: false,
    isLoading: false,
    url: '',
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true, isSearchDisabled: true });
      getImages(query, page)
        .then(({ hits: photos, totalHits: total_images }) => {
          if (!photos.length) {
            this.setState({
              error:
                'Sorry, there are no images matching your search query. Please try again.',
            });
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...photos],
            isLoadMore: page < Math.ceil(total_images / 12),
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }

    this.setState({ query, images: [], page: 1 });
  };

  openModal = url => {
    this.setState({ url });
  };
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoadMore, isLoading, url } = this.state;

    return (
      <>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        {isLoadMore && <Button onClick={this.loadMore}>Load more</Button>}
        {url && <Modal closeModal={this.openModal} url={url} />}
      </>
    );
  }
}
