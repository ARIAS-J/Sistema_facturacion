import axios from "axios";

export function deleteSeller(data) {
  return axios.delete(`http://127.0.0.1:8000/api/v1/vendedores/${data.id}`)
} 