import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImage} from './Modal.styled';
import PropTypes from 'prop-types';


const rootModal = document.querySelector('#root-modal');

export default class Modal extends Component {
  
  static propTypes = {
    selectedImage: PropTypes.string,
    tags: PropTypes.string,
    onClose: PropTypes.func,
  };

    componentDidMount() {
        window.addEventListener('keydown', this.handleEscape);
    };


    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEscape);
    };

    handleEscape = e => {
        if (e.code === 'Escape') {
            this.props.closeModal();
        }
    };

      handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
    };
    
    render() {
             
        return createPortal(
            < Overlay onClick={this.handleBackdrop}>
                <ModalImage>{this.props.children}</ModalImage> 
            </ Overlay>,
            rootModal
        );
    }
}

