import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer} from './Modal.styled';
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
      this.props.onClose();
    }
  };

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
      const { image, tags } = this.props;
      
    return createPortal(
      <Overlay onClick={this.handleBackdrop}>
            <ModalContainer>
                 <img src={image} alt={tags } />
        </ModalContainer>
      </Overlay>
   , rootModal
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  tags: PropTypes.string,
};