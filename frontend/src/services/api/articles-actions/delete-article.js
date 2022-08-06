import axios from "../../../axios-config";

export function deleteArticle(data) {
  return axios.delete(`/api/v1/articulos/${data.id}`)
} 