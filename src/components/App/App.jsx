import { Component } from "react";
import axios from 'axios';
import { Container } from './App.styled';

import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal  from '../Modal/Modal';
import {fetchImage}  from '../services/api';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class App extends Component {
 
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    selectedImage: null,
    status: 'idle',
    error: '',
    totalHits: 0,
     showModal: false,
  };
  
  

  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending', });

      try {
        const imageData = await fetchImage(searchQuery, page);
        this.totalHits = imageData.total;
        const imagesHits = imageData.hits;

        if (!imagesHits.length) {
          alert('No results were found for your search, please try something else.')
        }

        this.setState(({ images }) => ({
          images: [...images, ...imagesHits],
          status: 'resolved',
          
        }));

        if (page > 1) {
          const CARD_HEIGHT = 300;
          window.scrollBy({
            top: CARD_HEIGHT * 2,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        alert(`Sorry something went wrong. ${error.message}`);
        this.setState({ status: 'rejected' });
      }
    }
  }

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    // this.resetState();
    this.setState({  images: [],
      searchQuery,
      page: 1,
      error: null,});
  };


  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImage: largeImageUrl,
      alt: tags,
    });
  };

   resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      selectedImage: null,
      alt: null,
      status: 'idle',
    });
  };

   loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState({
      selectedImage: null,
    });
  };

    render() {
      const { images, selectedImage, alt } = this.state;

      return (
        <Container >
          <Searchbar onSubmit={this.handleFormSubmit} />

          {images.length > 0 &&  (
            <ImageGallery images={images} selectedImage={this.handleSelectedImage} />
          )}


          {selectedImage && (
            <Modal selectedImage={selectedImage} tags={alt} onClose={this.closeModal } />
          )}
          
        </Container>
      );
    }
 
  };

