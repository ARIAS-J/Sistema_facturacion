import axios from "../../../axios-config";

export function deleteInvoice(data) {
  return axios.delete(`/api/v1/facturacion/${data.id}`)
} 