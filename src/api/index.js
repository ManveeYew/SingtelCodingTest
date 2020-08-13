import qs from 'qs';
import api from './helper';

// Film list
export const getFilmList = (search, type, page) =>
  api.get(`?apikey=acb5ce54&s=${search}&type=${type}&page=${page}`);

// Film details
export const getFilm = (id) =>
  api.get(`?apikey=acb5ce54&i=${id}`);
