import axios from "axios";

export function patchInvoices(data) {
  return axios.put(`http://127.0.0.1:8000/api/v1/facturacion/${data.id}/`, data);
}