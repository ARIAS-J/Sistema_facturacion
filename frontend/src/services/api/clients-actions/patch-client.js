import axios from "../../../axios-config";

export function patchClient(data) {
  return axios.put(`/api/v1/clientes/${data.id}/`, data);
}