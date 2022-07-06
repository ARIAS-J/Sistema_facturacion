import axios from "axios";

export function patchArticle(data) {
  return axios.put(`http://127.0.0.1:8000/api/v1/articulos/${data.id}/`, data);
}