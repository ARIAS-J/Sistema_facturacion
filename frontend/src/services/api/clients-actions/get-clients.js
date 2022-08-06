import axios from 'axios';

export function getClients() {
  return axios.get('/api/v1/clientes');
}