import axios from "axios";

export function patchClient(data) {
  return axios.put(`http://127.0.0.1:8000/api/v1/clientes/${data.id}/`, data);
}