import { Component } from "react";
import { Container} from './App.styled';
import ScrollToTop from "react-scroll-to-top";


import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal  from '../Modal/Modal';
import { fetchImage } from '../services/api';
import Button from "components/Button/Button";
import Error from "components/Error/Error";
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
      error: 'There is no request for an empty tape!',
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
            error: 'Sorry, no images found. Please, try again!',
          });
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

        {status === 'rejected' && <Error message={error} />}

        {status === 'pending' && <Loader />}

        {showModal && (
          <Modal image={modalImage} closeModal={this.toggleModal} />
        )}

        <ScrollToTop smooth width="20" height="20" color="white"
          style={{
            borderRadius: 50,
            backgroundColor: "#5b69ba",
            fontweight: 500,
          }}
    
        />
      </Container>
    );
  }
}