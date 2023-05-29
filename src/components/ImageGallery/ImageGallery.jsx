import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';

export default function ImageGallery({ images, selectedImage }) {
    return (
        <List>
            {images.map(({ id, tags, webformatURL, largeImageURL }) => (
                <ImageGalleryItem
                    key={id}
                    tag={tags}
                    previewImage={webformatURL}
                        selectedImage = {() => selectedImage(largeImageURL, tags)}
                
            />
            ))}
            
        </List>
    );
}

ImageGallery.protoType = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            tags: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        })
    ),
    selectedImage: PropTypes.func,
};