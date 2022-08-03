import axios from "axios";

export function contabilizar(data) {
  return axios.post('http://127.0.0.1:8000/api/v1/contabilizar', data);
}