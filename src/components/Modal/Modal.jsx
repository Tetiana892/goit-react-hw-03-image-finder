import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImage} from './Modal.styled';
import PropTypes from 'prop-types';


const  modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  
  static propTypes = {
   onClick: PropTypes.func,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };


    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

      handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
    };
    
    render() {
             
        return createPortal(
            < Overlay onClick={this.handleBackdrop}>
                <ModalImage>{this.props.children}</ModalImage> 
            </ Overlay>,
            modalRoot,
        );
    }
}

