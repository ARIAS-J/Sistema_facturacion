import axios from "../../../axios-config";

export function postSeller(data) {
  return axios.post('/api/v1/vendedores', data);
}