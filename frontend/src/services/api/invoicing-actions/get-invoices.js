import axios from 'axios';

export function getInvoices() {
  return axios.get('/api/v1/facturacion');
}