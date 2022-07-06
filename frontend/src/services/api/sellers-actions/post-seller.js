import axios from "axios";

export function postSeller(data) {
  return axios.post('http://127.0.0.1:8000/api/v1/vendedores', data);
}