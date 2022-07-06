import axios from "axios";

export function deleteArticle(data) {
  return axios.delete(`http://127.0.0.1:8000/api/v1/articulos/${data.id}`)
} 