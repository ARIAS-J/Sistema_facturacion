import axios from "../../../axios-config";

export function contabilizar(data) {
  return axios.post('/api/v1/contabilizar', data);
}