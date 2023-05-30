import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImage} from './Modal.styled';
import PropTypes from 'prop-types';

const rootModal = document.querySelector('#root-modal');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e => {
    if (e.code === 'Escape') {
      this.props.onclose();
    }
  };

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onclose();
    }
  };

  render() {
      const { image } = this.props;
      
    return createPortal(
      <Overlay onClick={this.handleBackdrop}>
            <ModalImage >
                 <img src={image.largeImageURL} alt={ image.tags } />
        </ModalImage>
      </Overlay>
   , rootModal
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onclose: PropTypes.func,
};