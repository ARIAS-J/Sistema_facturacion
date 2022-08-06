import axios from 'axios';

export function getSellers() {
  return axios.get('/api/v1/vendedores');
}