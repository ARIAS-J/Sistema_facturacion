import axios from "../../../axios-config";

export function patchInvoices(data) {
  return axios.put(`/api/v1/facturacion/${data.id}/`, data);
}