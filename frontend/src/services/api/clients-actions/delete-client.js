import axios from "../../../axios-config";

export function deleteClient(info) {
  return axios.delete(`/api/v1/clientes/${info.id}`)
} 