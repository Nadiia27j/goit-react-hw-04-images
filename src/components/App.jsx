import { useState, useEffect } from 'react';
import  { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPicture, needValues } from 'services/api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';



export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    const renderGallery = async () => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await fetchPicture(query, page);

        if (totalHits === 0) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        const newPictures = needValues(hits);

        setPictures(pictures => [...pictures, ...newPictures]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(error);
        toast.error('Oops... Something went wrong');
      }finally {
        setIsLoading(false);
      }
    };

    renderGallery();
  }, [error, page, query]);

  const onFormSubmit = query => {
    setQuery(query);
    setPictures([]);
    setPage(1);
  }

  const onLoadMore = () => {
    setPage(page => page + 1);
  }

  const openModal = (largeImageURL, tags) => {
    toggleModal();
    setLargeImageURL(largeImageURL);
    setTags(tags);
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const allPictures = pictures.length === totalHits;


  return (
    <>
    <Searchbar onSubmit={onFormSubmit} />
    <ToastContainer autoClose={3000} />
   {pictures && <ImageGallery pictures={pictures} onOpenModal={openModal} />}  
    {isLoading && <Loader />}

    {pictures.length !== 0 && !isLoading && !allPictures && (
      <Button onClick={onLoadMore} />
    )}
    {showModal && (
      <Modal 
      onModalClick={toggleModal}
      largeImage={largeImageURL}
      alt={tags} 
      />
    )}
   </>
  );
};

