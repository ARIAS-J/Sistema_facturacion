import axios from "../../../axios-config";

export function deleteSeller(data) {
  return axios.delete(`/api/v1/vendedores/${data.id}`)
} 