import { Component } from "react";
import { Container } from './App.styled';
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
// import { fetchImage } from "./services/api";





export default class App extends Component {
  state = {
    images: [],
     searchQuery: '',
  }

  render() {
    const { images } = this.state;

    return (
     <Container >
   <Searchbar/>
        <ImageGallery images={ images} />
    </Container>
  );
}
 
};

