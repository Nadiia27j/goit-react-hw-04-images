import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '30077711-4b113b89ab0e54a97a0c4d035',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchPicture = async (query, page) => {
  const response = await axios.get(`?q=${query}&page=${page}`);
  return response.data;
}

export function needValues(data) {
  return data.map(({ id, largeImageURL, webformatURL, tags }) => ({
    id,
    largeImageURL,
    webformatURL,
    tags,
  }));
}

