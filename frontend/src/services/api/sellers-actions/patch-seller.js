import axios from "axios";

export function patchSeller(data) {
  return axios.put(`http://127.0.0.1:8000/api/v1/vendedores/${data.id}/`, data);
}