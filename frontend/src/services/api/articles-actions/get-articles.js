import axios from 'axios';

export function getArticles() {
  return axios.get('/api/v1/articulos');
}