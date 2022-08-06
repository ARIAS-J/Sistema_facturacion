import axios from "../../../axios-config";

export function patchArticle(data) {
  return axios.put(`/api/v1/articulos/${data.id}/`, data);
}