import PropTypes from 'prop-types';
import { Item, ItemImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem ({ previewImage, tags, onClickImage  })  {
    return (
        <Item>
            <ItemImage src={ previewImage} alt={tags} onClick={onClickImage} />
</Item>
    )
}

ImageGalleryItem.protoType = {
   tags: PropTypes.string.isRequired,
  previewImg: PropTypes.string.isRequired,
  onClickImage: PropTypes.func,
};