import axios from "axios";

export function deleteClient(info) {
  return axios.delete(`http://127.0.0.1:8000/api/v1/clientes/${info.id}`)
} 