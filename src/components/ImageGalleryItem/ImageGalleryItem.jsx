import PropTypes from 'prop-types';
import { Item, ItemImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem ({ previewImage, tags, selectedImage  })  {
    return (
        <Item>
            <ItemImage src={ previewImage} alt={tags} onClick={selectedImage } />
</Item>
    )
}

ImageGalleryItem.protoType = {
   tags: PropTypes.string.isRequired,
  previewImg: PropTypes.string.isRequired,
  selectedImage: PropTypes.func,
};