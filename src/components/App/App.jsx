import { Component } from "react";
import { Container} from './App.styled';
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal  from '../Modal/Modal';
import { fetchImage } from '../services/api';
import Button from "components/Button/Button";
import scroll from "components/services/scroll";
import Loader from "components/Loader/Loader";


export default class App extends Component {
 
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    status: 'idle',
    totalHits: 0,
    error: '',
    showModal: false,
    modalImage: null,
  };

  searchValue = newQuery => {
    if (newQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery: newQuery,
        page: 1,
      });
    }
  };

  
  LoadMore = () => {
    this.setState(prevState => ({
    page: prevState.page + 1,
    }));
  };

 toggleModal = largeImageURL => {
    this.setState(({ showModal}) => ({
      showModal: !showModal,
      modalImage: largeImageURL,
    }));
  };

  errorString = () => {
    this.setState({
      images: [],
      status: 'rejected',
      error: [],
    });
  };

  componentDidUpdate(_, prevState) {
    const prevImages = prevState.searchQuery;
    const prevPage = prevState.page;

    const nextImages = this.state.searchQuery;
    const nextPage = this.state.page;

    if (prevImages !== nextImages || prevPage !== nextPage) {
      this.setState({
        status: 'pending',
      });
      if (nextPage === 1) {
        this.setState({ images: [] });
         
      }
      this.fetchGallery();
    
    }
  }

  fetchGallery = () => {
    const { searchQuery, page } = this.state;

    fetchImage(searchQuery, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolved',
          totalHits: response.totalHits,
        }));

        if (response.hits.length === 0) {
          this.setState({
            status: 'rejected',
             return: toast.error('🦄Sorry, no images found. Please, try again!'),
          });
        }

        if ( page === 1) {
          toast.success(`🦄 Hooray! We found ${response.totalHits} images.`);
        }

        const totalPages = Math.ceil(response.totalHits / 12);
 
        if (page === totalPages) {
          toast.info("🦄 You've reached the end of search results.");   
        }
        
        scroll();
      })
       .catch(error =>
        this.setState({ error: error.message, status: 'rejected' })
      );
    
  };

  render() {

    const { images, status, error, showModal, modalImage, totalHits } =
      this.state;

    return (
      <Container >
        <Searchbar onSubmit={this.searchValue} value={this.errorString} />

        {status !== 'idle' && images.length > 0 && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}

        {status === 'resolved' && images.length !== totalHits && (
          <Button onClick={this.LoadMore} />
        )}

        {status === 'rejected' && toast.error(error.message)}

        {status === 'pending' && <Loader />}

        {showModal && (
          <Modal image={modalImage} onClose={this.toggleModal} />
        )}

        <ScrollToTop smooth width="20" height="20" color="white"
          style={{
            borderRadius: 50,
            backgroundColor: "#5b69ba",
            fontweight: 500,
          }}
        />
          <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      </Container>
    );
  }
}