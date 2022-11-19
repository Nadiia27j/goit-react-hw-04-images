import PropTypes from 'prop-types';
import {
  ImageGalleryItemCard,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, openModal, largeImageURL, tag }) => {
  return (
    <ImageGalleryItemCard>
      <ImageGalleryItemImg
        src={url}
        alt={tag}
        onClick={() => openModal(largeImageURL, tag)}
      />
    </ImageGalleryItemCard>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
