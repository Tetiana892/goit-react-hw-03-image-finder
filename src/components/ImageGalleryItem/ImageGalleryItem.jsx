import PropTypes from 'prop-types';
import { Item, ItemImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem ({ previewImage, alt, onClickImage })  {
    return (
        <Item>
            <ItemImage src="{ previewImage}" alt="{alt}" onClick={onClickImage } />
</Item>
    )
}

ImageGalleryItem.protoType = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClickImage: PropTypes.any.isRequired,
};