import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

export default function Button({ onClick }) {
  return (
    <ButtonLoadMore type="button" onClick={onClick}>
      Load more
    </ButtonLoadMore>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};