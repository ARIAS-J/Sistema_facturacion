import axios from "../../../axios-config";

export function postClient(client) {
  return axios.post('/api/v1/clientes', client);
}