import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearch } from 'react-icons/bi';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.info('Please enter a value to search!');
      return;
    }
    onSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BiSearch style={{ width: 25, height: 25 }} />
        </SearchFormButton>

        <label>
          <SearchFormInput
            onChange={handleChange}
            value={query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </label>
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
