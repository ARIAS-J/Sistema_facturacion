import axios from "../../../axios-config";

export function postInvoice(data) {
  return axios.post('/api/v1/facturacion', data);
}