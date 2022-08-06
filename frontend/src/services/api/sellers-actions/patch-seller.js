import axios from "../../../axios-config";

export function patchSeller(data) {
  return axios.put(`/api/v1/vendedores/${data.id}/`, data);
}